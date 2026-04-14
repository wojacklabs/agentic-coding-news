import type { Post } from "../lib/types.ts";

const UA = "agentic-coding-news/0.1 (+reddit; bun)";
const MAX_TEXT_CHARS = 2000;
/** Freshness window: only accept posts published within this many days. */
const FRESHNESS_WINDOW_DAYS = 3;
const FRESHNESS_WINDOW_SEC = FRESHNESS_WINDOW_DAYS * 86400;

/** Reddit child.data shape (fields we use). */
export interface RedditChildData {
  id: string;
  title: string;
  selftext: string | null;
  author: string;
  url: string;
  score: number;
  created_utc: number;
  permalink: string;
  is_self: boolean;
  name?: string; // fullname e.g. "t3_abc123"
}

interface RedditChild {
  kind: string;
  data: RedditChildData;
}

interface RedditListing {
  kind: string;
  data: {
    children: RedditChild[];
    after: string | null;
  };
}

type Fetcher = typeof globalThis.fetch;

export interface RedditFetchOpts {
  /** Max posts per subreddit. Default 50. */
  limit?: number;
  /** Sort: hot | new | top. Default "hot". */
  sort?: "hot" | "new" | "top";
  /** Injectable fetch for testing. */
  fetcher?: Fetcher;
  /** Timeout in ms. Default 30_000. */
  timeoutMs?: number;
}

/** Fetch Reddit posts from multiple subreddits via public .json endpoint. */
export async function fetchRedditPosts(
  subs: string[],
  opts: RedditFetchOpts = {},
): Promise<Post[]> {
  const f = opts.fetcher ?? globalThis.fetch;
  const limit = opts.limit ?? 50;
  const sort = opts.sort ?? "hot";
  const timeoutMs = opts.timeoutMs ?? 30_000;

  const urls = subs.map(
    (sub) =>
      `https://www.reddit.com/r/${encodeURIComponent(sub)}/${sort}.json?limit=${limit}`,
  );

  const results = await Promise.allSettled(
    urls.map((u) => fetchListing(f, u, timeoutMs)),
  );

  const seen = new Set<string>();
  const posts: Post[] = [];
  const now = Math.floor(Date.now() / 1000);

  for (let i = 0; i < results.length; i++) {
    const r = results[i]!;
    if (r.status !== "fulfilled") {
      console.warn(`[reddit] r/${subs[i]!} failed: ${String((r as PromiseRejectedResult).reason)}`);
      continue;
    }
    for (const child of r.value) {
      const p = normalizeRedditChild(child, now);
      if (!p) continue;
      if (seen.has(p.source_id)) continue;
      seen.add(p.source_id);
      posts.push(p);
    }
  }
  return posts;
}

async function fetchListing(
  f: Fetcher,
  url: string,
  timeoutMs: number,
): Promise<RedditChildData[]> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await f(url, {
      headers: { "User-Agent": UA },
      signal: ctl.signal,
    });
    if (!res.ok) return [];
    const json = (await res.json()) as RedditListing;
    return (json.data?.children ?? [])
      .filter((c): c is RedditChild => c.kind === "t3")
      .map((c) => c.data);
  } finally {
    clearTimeout(t);
  }
}

/** Strip "t3_" prefix from Reddit fullname/id. */
function stripT3(id: string): string {
  return id.startsWith("t3_") ? id.slice(3) : id;
}

/** Convert a Reddit child.data to a Post. Returns null if text is empty or post is stale. */
export function normalizeRedditChild(
  data: RedditChildData,
  nowSec: number,
): Post | null {
  // Reject posts older than FRESHNESS_WINDOW_DAYS.
  if (nowSec - Math.floor(data.created_utc) > FRESHNESS_WINDOW_SEC) return null;

  const selftext = data.selftext?.trim() ?? "";
  const title = data.title?.trim() ?? "";

  // text: selftext for self posts, title for link posts
  const rawText = data.is_self && selftext.length > 0 ? selftext : title;
  const text = rawText.slice(0, MAX_TEXT_CHARS);
  if (text.length === 0) return null;

  // url: permalink for self posts, external url for link posts
  const url = data.is_self
    ? `https://www.reddit.com${data.permalink}`
    : data.url;

  return {
    source: "reddit",
    source_id: stripT3(data.id),
    url,
    author: data.author ?? null,
    title: title.length > 0 ? title : null,
    text,
    lang: null,
    posted_at: Math.floor(data.created_utc),
    fetched_at: nowSec,
    score: data.score ?? 0,
  };
}
