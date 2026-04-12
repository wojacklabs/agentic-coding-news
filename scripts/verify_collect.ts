// Verify collect phase structures without network calls.
import { rmSync } from "node:fs";
import { resolve } from "node:path";
import { openDb } from "../src/lib/db.ts";
import { insertPosts } from "../src/sources/persist.ts";
import { normalizeRssItem, parseFeedXml } from "../src/sources/rss.ts";
import { normalizeHnHit, type AlgoliaHit } from "../src/sources/hn.ts";
import {
  normalizeRedditChild,
  type RedditChildData,
} from "../src/sources/reddit.ts";
import { RSS_FEEDS, HN_KEYWORDS, REDDIT_SUBS } from "../src/config.ts";
import { addCost, getTodayTotal } from "../src/lib/budget.ts";
import { getRunId } from "../src/lib/log.ts";
import type { Post } from "../src/lib/types.ts";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`verify_collect: ${msg}`);
}

const PROJECT_ROOT = resolve(import.meta.dir, "..");
const TMP_DB = resolve(PROJECT_ROOT, "db/verify_collect.db");
function cleanup() {
  for (const s of ["", "-wal", "-shm", "-journal"]) {
    try {
      rmSync(TMP_DB + s);
    } catch {
      /* noop */
    }
  }
}
cleanup();

// --- (1) config validation ---
assert(RSS_FEEDS.length > 0, "RSS_FEEDS not empty");
assert(HN_KEYWORDS.length > 0, "HN_KEYWORDS not empty");
assert(REDDIT_SUBS.length > 0, "REDDIT_SUBS not empty");
for (const url of RSS_FEEDS) {
  new URL(url); // throws if invalid
}
console.log(
  `✓ config OK (rss=${RSS_FEEDS.length}, hn_kw=${HN_KEYWORDS.length}, subs=${REDDIT_SUBS.length})`,
);

// --- (2) normalize + insertPosts round-trip with mock data ---
const NOW = Math.floor(Date.UTC(2026, 3, 12, 0, 0, 0) / 1000);

// RSS mock
const ATOM = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom">
<entry><id>c-1</id><link rel="alternate" href="https://example.com/c1"/>
<title>Collect test RSS</title><published>2026-04-11T09:00:00Z</published>
<summary>RSS body</summary></entry></feed>`;
const rssRaws = parseFeedXml(ATOM, "https://example.com/feed.atom");
const rssPosts = rssRaws
  .map((r) => normalizeRssItem(r, NOW))
  .filter((p): p is Post => p !== null);
assert(rssPosts.length === 1, `rss posts: ${rssPosts.length}`);

// HN mock
const hnHit: AlgoliaHit = {
  objectID: "88001",
  title: "Collect test HN",
  url: "https://example.com/hn1",
  author: "hn_user",
  created_at_i: NOW - 100,
  points: 42,
  story_text: null,
  num_comments: 5,
};
const hnPost = normalizeHnHit(hnHit, NOW);
assert(hnPost !== null, "hn normalize");

// Reddit mock
const rdChild: RedditChildData = {
  id: "rd001",
  title: "Collect test Reddit",
  selftext: "Reddit body text",
  author: "rd_user",
  url: "https://reddit.com/r/test/rd001",
  score: 30,
  created_utc: NOW - 200,
  permalink: "/r/test/comments/rd001/",
  is_self: true,
};
const rdPost = normalizeRedditChild(rdChild, NOW);
assert(rdPost !== null, "reddit normalize");

// Insert all
const db = openDb(TMP_DB);
const allPosts = [...rssPosts, hnPost, rdPost];
const res1 = insertPosts(db, allPosts);
assert(res1.inserted === 3, `first insert: ${res1.inserted}`);
const res2 = insertPosts(db, allPosts);
assert(res2.skipped === 3, `second insert skipped: ${res2.skipped}`);
console.log("✓ normalize + insertPosts round-trip (3 sources)");

// --- (3) budget + cost ---
const runId = getRunId();
addCost(runId, "collect", 0, db);
const total = getTodayTotal(db);
assert(total >= 0, "budget non-negative");
console.log(`✓ budget OK (today=$${total.toFixed(4)})`);

// --- (4) per-source counts ---
const countBySource = (source: string) => {
  const row = db
    .query<{ c: number }, [string]>(
      "SELECT COUNT(*) AS c FROM posts WHERE source = ?",
    )
    .get(source);
  return row?.c ?? 0;
};
assert(countBySource("rss") === 1, "rss count");
assert(countBySource("hn") === 1, "hn count");
assert(countBySource("reddit") === 1, "reddit count");
console.log("✓ per-source DB counts");

db.close();
cleanup();
console.log("STEP8_VERIFY_COLLECT_PASS");
