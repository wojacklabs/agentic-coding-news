import { rmSync } from "node:fs";
import { resolve } from "node:path";
import { openDb } from "../src/lib/db.ts";
import type { Post } from "../src/lib/types.ts";
import { normalizeHnHit, type AlgoliaHit } from "../src/sources/hn.ts";
import {
  normalizeRedditChild,
  type RedditChildData,
} from "../src/sources/reddit.ts";
import { insertPosts } from "../src/sources/persist.ts";

const PROJECT_ROOT = resolve(import.meta.dir, "..");
const TMP_DB = resolve(PROJECT_ROOT, "db/verify_hn_reddit.db");

function cleanup() {
  for (const suffix of ["", "-wal", "-shm", "-journal"]) {
    try {
      rmSync(TMP_DB + suffix);
    } catch {
      /* noop */
    }
  }
}
cleanup();

const NOW = 1744300800; // 2026-04-10T16:00:00Z

// ===================== HN Sample Data =====================

const HN_HITS: AlgoliaHit[] = [
  {
    objectID: "40001111",
    title: "Claude Code ships agentic workflows",
    url: "https://example.com/claude-code",
    author: "pg",
    created_at_i: 1744290000,
    points: 342,
    story_text: null,
    num_comments: 89,
  },
  {
    objectID: "40002222",
    title: "Show HN: Local LLM on a Raspberry Pi",
    url: null, // self-post → HN URL
    author: "tester",
    created_at_i: 1744295000,
    points: 58,
    story_text: "I got Llama 3.2 running on a Pi 5 with 8GB RAM. Here is how.",
    num_comments: 34,
  },
  {
    // Empty text + empty title → should be dropped
    objectID: "40003333",
    title: null,
    url: null,
    author: "ghost",
    created_at_i: 1744296000,
    points: 0,
    story_text: null,
    num_comments: 0,
  },
  {
    // Empty title, has story_text → keep
    objectID: "40004444",
    title: null,
    url: "https://example.com/no-title",
    author: "anon",
    created_at_i: 1744297000,
    points: 12,
    story_text: "Ask HN: What editor do you use?",
    num_comments: 150,
  },
];

// ===================== HN Normalization Tests =====================

console.log("--- HN normalization ---");

const hnPosts = HN_HITS.map((h) => normalizeHnHit(h, NOW)).filter(
  (p): p is Post => p !== null,
);

// Hit #3 (objectID=40003333) has no text → dropped
if (hnPosts.length !== 3) {
  throw new Error(`hn: expected 3 posts, got ${hnPosts.length}`);
}

// Hit #1: external URL
const hn0 = hnPosts[0]!;
if (hn0.source !== "hn") throw new Error(`hn0 source: ${hn0.source}`);
if (hn0.source_id !== "40001111") throw new Error(`hn0 id: ${hn0.source_id}`);
if (hn0.url !== "https://example.com/claude-code") {
  throw new Error(`hn0 url: ${hn0.url}`);
}
if (hn0.score !== 342) throw new Error(`hn0 score: ${hn0.score}`);
// text fallback to title when story_text is null
if (hn0.text !== "Claude Code ships agentic workflows") {
  throw new Error(`hn0 text: "${hn0.text}"`);
}

// Hit #2: no external URL → HN self URL
const hn1 = hnPosts[1]!;
if (hn1.url !== "https://news.ycombinator.com/item?id=40002222") {
  throw new Error(`hn1 url: ${hn1.url}`);
}
// story_text present → use it
if (!hn1.text.includes("Llama 3.2")) {
  throw new Error(`hn1 text: "${hn1.text}"`);
}

// Hit #4: no title, has story_text
const hn2 = hnPosts[2]!;
if (hn2.title !== null) throw new Error(`hn2 title: ${hn2.title}`);
if (!hn2.text.includes("What editor")) {
  throw new Error(`hn2 text: "${hn2.text}"`);
}

console.log(`  normalized ${hnPosts.length}/4 hits (1 dropped: empty text)`);

// ===================== Reddit Sample Data =====================

const REDDIT_CHILDREN: RedditChildData[] = [
  {
    id: "t3_abc123",
    title: "Claude 4 announced - mind blown",
    selftext: "Anthropic just released Claude 4 with incredible reasoning.",
    author: "user1",
    url: "https://www.reddit.com/r/ClaudeAI/comments/abc123/claude_4_announced/",
    score: 1250,
    created_utc: 1744291000,
    permalink: "/r/ClaudeAI/comments/abc123/claude_4_announced/",
    is_self: true,
  },
  {
    id: "def456",
    title: "Ollama vs LM Studio benchmark",
    selftext: null,
    author: "user2",
    url: "https://blog.example.com/ollama-lm-studio",
    score: 780,
    created_utc: 1744292000,
    permalink: "/r/LocalLLaMA/comments/def456/ollama_vs_lm_studio/",
    is_self: false,
  },
  {
    // Empty selftext on self post → falls back to title
    id: "ghi789",
    title: "What models are you running locally?",
    selftext: "",
    author: "user3",
    url: "https://www.reddit.com/r/LocalLLaMA/comments/ghi789/what_models/",
    score: 320,
    created_utc: 1744293000,
    permalink: "/r/LocalLLaMA/comments/ghi789/what_models/",
    is_self: true,
  },
  {
    // Empty title + empty selftext → should be dropped
    id: "jkl000",
    title: "",
    selftext: "",
    author: "bot",
    url: "https://www.reddit.com/r/test/comments/jkl000/",
    score: 0,
    created_utc: 1744294000,
    permalink: "/r/test/comments/jkl000/",
    is_self: true,
  },
];

// ===================== Reddit Normalization Tests =====================

console.log("--- Reddit normalization ---");

const redditPosts = REDDIT_CHILDREN.map((d) =>
  normalizeRedditChild(d, NOW),
).filter((p): p is Post => p !== null);

// Child #4 (jkl000) has empty text → dropped
if (redditPosts.length !== 3) {
  throw new Error(`reddit: expected 3 posts, got ${redditPosts.length}`);
}

// Child #1: self post → permalink URL, selftext as text
const rd0 = redditPosts[0]!;
if (rd0.source !== "reddit") throw new Error(`rd0 source: ${rd0.source}`);
// t3_ prefix stripped
if (rd0.source_id !== "abc123") {
  throw new Error(`rd0 id: ${rd0.source_id} (should strip t3_)`);
}
if (rd0.url !== "https://www.reddit.com/r/ClaudeAI/comments/abc123/claude_4_announced/") {
  throw new Error(`rd0 url: ${rd0.url}`);
}
if (!rd0.text.includes("incredible reasoning")) {
  throw new Error(`rd0 text: "${rd0.text}"`);
}
if (rd0.score !== 1250) throw new Error(`rd0 score: ${rd0.score}`);

// Child #2: link post → external URL, title as text
const rd1 = redditPosts[1]!;
if (rd1.source_id !== "def456") throw new Error(`rd1 id: ${rd1.source_id}`);
if (rd1.url !== "https://blog.example.com/ollama-lm-studio") {
  throw new Error(`rd1 url: ${rd1.url}`);
}
if (rd1.text !== "Ollama vs LM Studio benchmark") {
  throw new Error(`rd1 text: "${rd1.text}"`);
}

// Child #3: self post with empty selftext → falls back to title
const rd2 = redditPosts[2]!;
if (rd2.text !== "What models are you running locally?") {
  throw new Error(`rd2 text: "${rd2.text}"`);
}
if (!rd2.url.includes("/r/LocalLLaMA/")) {
  throw new Error(`rd2 url: ${rd2.url}`);
}

console.log(`  normalized ${redditPosts.length}/4 children (1 dropped: empty text)`);

// ===================== DB Round-trip =====================

console.log("--- DB round-trip ---");

const allPosts = [...hnPosts, ...redditPosts];
const db = openDb(TMP_DB);

const first = insertPosts(db, allPosts);
if (first.inserted !== 6) {
  throw new Error(`first insert: expected 6, got ${JSON.stringify(first)}`);
}

// Idempotent re-insert
const second = insertPosts(db, allPosts);
if (second.skipped !== 6) {
  throw new Error(`second insert: expected 6 skipped, got ${JSON.stringify(second)}`);
}

// Per-source count
const hnCount = db
  .query<{ c: number }, []>("SELECT COUNT(*) AS c FROM posts WHERE source = 'hn'")
  .get();
const redditCount = db
  .query<{ c: number }, []>("SELECT COUNT(*) AS c FROM posts WHERE source = 'reddit'")
  .get();

if (!hnCount || hnCount.c !== 3) throw new Error(`hn db count: ${hnCount?.c}`);
if (!redditCount || redditCount.c !== 3) throw new Error(`reddit db count: ${redditCount?.c}`);

console.log(
  `  insertPosts OK (first=${first.inserted}, second.skipped=${second.skipped}, hn=${hnCount.c}, reddit=${redditCount.c})`,
);

// ===================== DI fetch mock (structural test) =====================

console.log("--- DI fetch mock ---");

// Verify fetchHnPosts/fetchRedditPosts accept injected fetcher
// Import dynamically to confirm the function signatures work
const { fetchHnPosts } = await import("../src/sources/hn.ts");
const { fetchRedditPosts } = await import("../src/sources/reddit.ts");

const mockFetch = (async () => {
  return new Response(JSON.stringify({ hits: HN_HITS }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}) as unknown as typeof globalThis.fetch;

const mockHnPosts = await fetchHnPosts({ fetcher: mockFetch, keywords: [] });
if (mockHnPosts.length !== 3) {
  throw new Error(`mock hn: expected 3, got ${mockHnPosts.length}`);
}

const mockRedditFetch = (async () => {
  return new Response(
    JSON.stringify({
      kind: "Listing",
      data: {
        children: REDDIT_CHILDREN.map((d) => ({ kind: "t3", data: d })),
        after: null,
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } },
  );
}) as unknown as typeof globalThis.fetch;

const mockRedditPosts = await fetchRedditPosts(["TestSub"], {
  fetcher: mockRedditFetch,
});
if (mockRedditPosts.length !== 3) {
  throw new Error(`mock reddit: expected 3, got ${mockRedditPosts.length}`);
}

console.log(`  DI mock OK (hn=${mockHnPosts.length}, reddit=${mockRedditPosts.length})`);

// ===================== Cleanup =====================

db.close();
cleanup();
console.log("STEP7_VERIFY_PASS");
