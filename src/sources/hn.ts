import type { Post } from "../lib/types.ts";

const UA = "agentic-coding-news/0.1 (+hn)";
const MAX_TEXT_CHARS = 2000;
const HN_BASE = "https://hn.algolia.com/api/v1/search";

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

  const urls: string[] = [
    `${HN_BASE}?tags=front_page&hitsPerPage=${hitsPerPage}`,
    ...keywords.map(
      (kw) =>
        `${HN_BASE}?query=${encodeURIComponent(kw)}&tags=story&hitsPerPage=${hitsPerPage}`,
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

/** Convert an Algolia hit to a Post. Returns null if text is empty. */
export function normalizeHnHit(hit: AlgoliaHit, nowSec: number): Post | null {
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
