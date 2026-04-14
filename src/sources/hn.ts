import type { Post } from "../lib/types.ts";

const UA = "agentic-coding-news/0.1 (+hn)";
const MAX_TEXT_CHARS = 2000;
const HN_BASE = "https://hn.algolia.com/api/v1/search";
/** Freshness window: only accept posts published within this many days. */
const FRESHNESS_WINDOW_DAYS = 3;
const FRESHNESS_WINDOW_SEC = FRESHNESS_WINDOW_DAYS * 86400;

/** Algolia hit shape (fields we use). */
export interface AlgoliaHit {
  objectID: string;
  title: string | null;
  url: string | null;
  author: string | null;
  created_at_i: number;
  points: number | null;
  story_text: string | null;
  num_comments: number | null;
}

interface AlgoliaResponse {
  hits: AlgoliaHit[];
}

type Fetcher = typeof globalThis.fetch;

export interface HnFetchOpts {
  /** Keywords to search (in addition to front_page). Empty = front_page only. */
  keywords?: string[];
  /** Max hits per request. Default 50. */
  hitsPerPage?: number;
  /** Injectable fetch for testing. */
  fetcher?: Fetcher;
  /** Timeout in ms. Default 30_000. */
  timeoutMs?: number;
}

/** Fetch HN posts via Algolia API: front_page + keyword searches. */
export async function fetchHnPosts(opts: HnFetchOpts = {}): Promise<Post[]> {
  const f = opts.fetcher ?? globalThis.fetch;
  const hitsPerPage = opts.hitsPerPage ?? 50;
  const timeoutMs = opts.timeoutMs ?? 30_000;
  const keywords = opts.keywords ?? [];

  // API-level freshness filter: reject stories older than FRESHNESS_WINDOW_DAYS.
  const cutoffSec = Math.floor(Date.now() / 1000) - FRESHNESS_WINDOW_SEC;
  const numericFilter = `numericFilters=${encodeURIComponent(`created_at_i>${cutoffSec}`)}`;

  const urls: string[] = [
    `${HN_BASE}?tags=front_page&hitsPerPage=${hitsPerPage}&${numericFilter}`,
    ...keywords.map(
      (kw) =>
        `${HN_BASE}?query=${encodeURIComponent(kw)}&tags=story&hitsPerPage=${hitsPerPage}&${numericFilter}`,
    ),
  ];

  const results = await Promise.allSettled(
    urls.map((u) => fetchAlgolia(f, u, timeoutMs)),
  );

  const seen = new Set<string>();
  const posts: Post[] = [];
  const now = Math.floor(Date.now() / 1000);

  for (const r of results) {
    if (r.status !== "fulfilled") continue;
    for (const hit of r.value) {
      const p = normalizeHnHit(hit, now);
      if (!p) continue;
      if (seen.has(p.source_id)) continue;
      seen.add(p.source_id);
      posts.push(p);
    }
  }
  return posts;
}

async function fetchAlgolia(
  f: Fetcher,
  url: string,
  timeoutMs: number,
): Promise<AlgoliaHit[]> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await f(url, {
      headers: { "user-agent": UA },
      signal: ctl.signal,
    });
    if (!res.ok) return [];
    const json = (await res.json()) as AlgoliaResponse;
    return json.hits ?? [];
  } finally {
    clearTimeout(t);
  }
}

/** Convert an Algolia hit to a Post. Returns null if text is empty or post is stale. */
export function normalizeHnHit(hit: AlgoliaHit, nowSec: number): Post | null {
  // Reject stories older than FRESHNESS_WINDOW_DAYS (defense-in-depth; API filter is primary).
  if (nowSec - hit.created_at_i > FRESHNESS_WINDOW_SEC) return null;

  const title = hit.title?.trim() ?? null;
  const storyText = hit.story_text?.trim().slice(0, MAX_TEXT_CHARS) ?? "";
  const text = storyText.length > 0 ? storyText : (title ?? "");
  if (text.length === 0) return null;

  const url =
    hit.url?.trim() ||
    `https://news.ycombinator.com/item?id=${hit.objectID}`;

  return {
    source: "hn",
    source_id: hit.objectID,
    url,
    author: hit.author ?? null,
    title,
    text,
    lang: "en",
    posted_at: hit.created_at_i,
    fetched_at: nowSec,
    score: hit.points ?? 0,
  };
}
