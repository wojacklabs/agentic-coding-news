import type { Post, Source } from "./types.ts";
import type { ExtractionResult } from "./mcp.ts";

/**
 * Normalise an ISO 8601 string / unix seconds / unix milliseconds into
 * unix seconds. Returns `null` when the input is unusable.
 *
 * The ms/sec split uses `10_000_000_000`: any integer above that is
 * assumed to already be in milliseconds. This boundary corresponds to
 * ~year 2286 in seconds, so it safely partitions every realistic
 * timestamp the scrapers will ever see.
 *
 * Numeric strings (e.g. `"1712700000"`) are NOT parsed as epochs —
 * `ExtractionResult.postedAt` contracts for ISO strings OR numbers.
 */
function parsePostedAt(v: string | number | null | undefined): number | null {
  if (v === null || v === undefined) return null;
  if (typeof v === "number") {
    if (!Number.isFinite(v) || v <= 0) return null;
    return v > 10_000_000_000 ? Math.floor(v / 1000) : Math.floor(v);
  }
  const ms = Date.parse(v);
  return Number.isFinite(ms) ? Math.floor(ms / 1000) : null;
}

/**
 * Convert a raw extraction item from Chrome MCP's `javascript_tool`
 * into a canonical `Post`. Returns `null` when required fields are
 * missing or text is whitespace-only, so the caller can drop the item.
 */
export function coerceRawToPost(
  raw: ExtractionResult,
  source: Source,
  fetchedAtSec: number,
): Post | null {
  if (!raw.sourceId || !raw.url) return null;
  const text = typeof raw.text === "string" ? raw.text.trim() : "";
  if (text === "") return null;
  const posted = parsePostedAt(raw.postedAt);
  if (posted === null) return null;
  const score =
    typeof raw.rawScore === "number" && Number.isFinite(raw.rawScore)
      ? raw.rawScore
      : 0;
  return {
    source,
    source_id: String(raw.sourceId),
    url: raw.url,
    author: raw.author ?? null,
    title: raw.title ?? null,
    text,
    lang: raw.lang ?? null,
    posted_at: posted,
    fetched_at: fetchedAtSec,
    score,
  };
}

/**
 * Deduplicate by (source, source_id) keeping the entry with the
 * highest `score`. When scores are equal the later entry wins.
 */
export function dedupeBySourceId(posts: readonly Post[]): Post[] {
  const best = new Map<string, Post>();
  for (const p of posts) {
    const key = `${p.source}|${p.source_id}`;
    const prev = best.get(key);
    if (!prev || p.score >= prev.score) best.set(key, p);
  }
  return [...best.values()];
}

/**
 * Convert a batch of raw extraction items into deduped Posts.
 * Invalid items are silently dropped — Claude L1 is expected to
 * record a counter in the metrics table.
 */
export function coerceBatch(
  raws: readonly ExtractionResult[],
  source: Source,
  fetchedAtSec: number,
): Post[] {
  const out: Post[] = [];
  for (const r of raws) {
    const p = coerceRawToPost(r, source, fetchedAtSec);
    if (p !== null) out.push(p);
  }
  return dedupeBySourceId(out);
}
