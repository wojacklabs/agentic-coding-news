import { XMLParser } from "fast-xml-parser";
import { createHash } from "node:crypto";
import type { Post } from "../lib/types.ts";

const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_TEXT_CHARS = 2000;
const UA = "agentic-coding-news/0.1 (+rss)";
/** Freshness window: only accept items published within this many days. */
const FRESHNESS_WINDOW_DAYS = 3;
const FRESHNESS_WINDOW_SEC = FRESHNESS_WINDOW_DAYS * 86400;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "#cdata",
  textNodeName: "#text",
  trimValues: true,
  parseTagValue: false,
  parseAttributeValue: false,
  removeNSPrefix: true, // dc:, content:, atom: → flat keys
});

export interface RawRssItem {
  feedUrl: string;
  id: string | null;
  link: string;
  title: string | null;
  author: string | null;
  published: string | null;
  content: string | null;
  summary: string | null;
}

export async function fetchRss(
  feedUrls: string[],
  opts: { timeoutMs?: number } = {},
): Promise<RawRssItem[]> {
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const results = await Promise.allSettled(
    feedUrls.map((u) => fetchOne(u, timeoutMs)),
  );
  const out: RawRssItem[] = [];
  for (let i = 0; i < results.length; i++) {
    const r = results[i]!;
    const url = feedUrls[i]!;
    if (r.status === "fulfilled") {
      out.push(...r.value);
    } else {
      console.warn(`[rss] feed failed: ${url}: ${String(r.reason)}`);
    }
  }
  return out;
}

async function fetchOne(
  feedUrl: string,
  timeoutMs: number,
): Promise<RawRssItem[]> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(feedUrl, {
      headers: {
        "user-agent": UA,
        accept:
          "application/atom+xml, application/rss+xml, application/xml;q=0.9, */*;q=0.5",
      },
      signal: ctl.signal,
    });
    if (!res.ok) return [];
    return parseFeedXml(await res.text(), feedUrl);
  } finally {
    clearTimeout(t);
  }
}

export function parseFeedXml(xml: string, feedUrl: string): RawRssItem[] {
  const doc = parser.parse(xml) as Record<string, unknown>;
  if (isRecord(doc["feed"])) return parseAtom(doc["feed"], feedUrl);
  if (isRecord(doc["rss"])) {
    const channel = (doc["rss"] as Record<string, unknown>)["channel"];
    if (isRecord(channel)) return parseRss2(channel, feedUrl);
  }
  return [];
}

function parseAtom(
  feed: Record<string, unknown>,
  feedUrl: string,
): RawRssItem[] {
  return asArray(feed["entry"])
    .map((e) => {
      // Atom <author> may be a single element or an array of co-authors.
      const firstAuthor = asArray(e["author"])[0];
      const authorName = firstAuthor
        ? asText(firstAuthor["name"]) ?? asText(firstAuthor["email"])
        : null;
      return {
        feedUrl,
        id: asText(e["id"]),
        link: pickAtomLink(e["link"]),
        title: asText(e["title"]),
        author: authorName,
        // Only `published` — `updated` mutates on edits and destabilises posted_at
        published: asText(e["published"]),
        content: asText(e["content"]),
        summary: asText(e["summary"]),
      } satisfies RawRssItem;
    })
    .filter((r) => r.link.length > 0);
}

function parseRss2(
  channel: Record<string, unknown>,
  feedUrl: string,
): RawRssItem[] {
  return asArray(channel["item"])
    .map((i) => ({
      feedUrl,
      id: asText(i["guid"]),
      link: asText(i["link"]) ?? "",
      title: asText(i["title"]),
      author: asText(i["creator"] ?? i["author"]),
      published: asText(i["pubDate"] ?? i["date"]),
      // content:encoded becomes `encoded` after removeNSPrefix
      content: asText(i["encoded"]),
      summary: asText(i["description"]),
    }))
    .filter((r) => r.link.length > 0);
}

/**
 * Normalize a raw feed item into a `Post`. Returns `null` when the item
 * is unusable (e.g. link is not a resolvable URL).
 */
export function normalizeRssItem(
  raw: RawRssItem,
  nowSec: number,
): Post | null {
  const trimmed = raw.link.trim();
  if (trimmed.length === 0) return null;
  let url: string;
  try {
    // Resolve relative links against the feed URL; reject anything invalid.
    url = new URL(trimmed, raw.feedUrl).href;
  } catch {
    return null;
  }
  const parsed = parseDate(raw.published);
  // Reject items older than FRESHNESS_WINDOW_DAYS. If published is missing,
  // we fall back to nowSec (treated as fresh) — same behaviour as before.
  if (parsed !== null && nowSec - parsed > FRESHNESS_WINDOW_SEC) return null;
  const posted = parsed ?? nowSec;
  const rawText = raw.content ?? raw.summary ?? raw.title ?? "";
  const stripped = stripHtml(rawText).slice(0, MAX_TEXT_CHARS);
  const title = raw.title ? stripHtml(raw.title) : null;
  const text = stripped.length > 0 ? stripped : (title ?? url);
  // sha1 seed is `url|title` only. Including `posted` would break
  // idempotency whenever `published` is absent and we fall back to `nowSec`.
  const sourceId =
    raw.id && raw.id.trim().length > 0
      ? raw.id.trim()
      : "sha1:" +
        createHash("sha1")
          .update(`${url}|${title ?? ""}`)
          .digest("hex");
  return {
    source: "rss",
    source_id: sourceId,
    url,
    author: raw.author ?? null,
    title,
    text,
    lang: null,
    posted_at: posted,
    fetched_at: nowSec,
    score: 0,
  };
}

// ---- helpers ----

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function asArray(v: unknown): Record<string, unknown>[] {
  if (v == null) return [];
  if (Array.isArray(v)) return v.filter(isRecord);
  if (isRecord(v)) return [v];
  return [];
}

function asText(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (isRecord(v)) {
    if (typeof v["#cdata"] === "string") return v["#cdata"] as string;
    if (typeof v["#text"] === "string") return v["#text"] as string;
  }
  return null;
}

function pickAtomLink(v: unknown): string {
  const arr = Array.isArray(v) ? v : [v];
  for (const l of arr) {
    if (typeof l === "string") return l;
    if (isRecord(l)) {
      const href = l["@_href"];
      const rel = l["@_rel"];
      if (
        typeof href === "string" &&
        (rel === undefined || rel === "alternate")
      ) {
        return href;
      }
    }
  }
  return "";
}

function parseDate(s: string | null): number | null {
  if (!s) return null;
  const ms = Date.parse(s); // RFC822 (RSS2) + ISO8601 (Atom) 모두 수용
  return Number.isFinite(ms) ? Math.floor(ms / 1000) : null;
}

// ---- HTML → text ----

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

export function stripHtml(html: string): string {
  let t = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  t = t.replace(/<\/(p|div|li|h[1-6])>|<br\s*\/?>/gi, "\n");
  t = t.replace(/<[^>]+>/g, "");
  t = t.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_m, body: string) => {
    if (body.startsWith("#x") || body.startsWith("#X")) {
      return String.fromCodePoint(parseInt(body.slice(2), 16));
    }
    if (body.startsWith("#")) {
      return String.fromCodePoint(parseInt(body.slice(1), 10));
    }
    return ENTITIES[body.toLowerCase()] ?? `&${body};`;
  });
  return t.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}
