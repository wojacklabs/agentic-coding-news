import { Window } from "happy-dom";
import { THREADS_SNIPPETS } from "../src/sources/threads.ts";
import { coerceRawToPost } from "../src/lib/extract.ts";
import type { ExtractionResult } from "../src/lib/mcp.ts";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`verify_threads: ${msg}`);
}

// ---------- (1) Hidden JSON extraction ----------

// Simulates the deeply-nested data-sjs JSON that Threads embeds.
// Two legit posts, one ad, one duplicate, and a second script tag
// with a "threads" wrapper (search-page structure).
const SAMPLE_JSON_1 = JSON.stringify({
  require: [
    [
      "RelayPrefetchedStreamCache",
      "next",
      [],
      [
        {
          __bbox: {
            result: {
              data: {
                mediaData: {
                  thread_items: [
                    {
                      post: {
                        id: "111111",
                        code: "CxABC123",
                        caption: { text: "AI agents are changing everything in 2026" },
                        user: { username: "alice_dev", pk: "10001" },
                        taken_at: 1712700000,
                        like_count: 420,
                        text_post_app_info: {},
                      },
                    },
                    {
                      // Ad post: should be excluded
                      post: {
                        id: "222222",
                        code: "CxAD0001",
                        caption: { text: "Buy our SaaS product now!" },
                        user: { username: "brand_official", pk: "20001" },
                        taken_at: 1712699000,
                        like_count: 5000,
                        is_paid_partnership: true,
                        text_post_app_info: {},
                      },
                    },
                    {
                      post: {
                        id: "333333",
                        code: "CxDEF456",
                        caption: { text: "Bun 2.0 just dropped, massive perf gains" },
                        user: { username: "bob_eng", pk: "10002" },
                        taken_at: 1712698000,
                        like_count: 1337,
                        text_post_app_info: {},
                      },
                    },
                    {
                      // Duplicate of alice's post (same code)
                      post: {
                        id: "111111",
                        code: "CxABC123",
                        caption: { text: "AI agents are changing everything in 2026" },
                        user: { username: "alice_dev", pk: "10001" },
                        taken_at: 1712700000,
                        like_count: 421,
                        text_post_app_info: {},
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ],
    ],
  ],
});

// Second script tag: "threads" wrapper (search results shape)
const SAMPLE_JSON_2 = JSON.stringify({
  require: [
    [
      "RelayPrefetchedStreamCache",
      "next",
      [],
      [
        {
          __bbox: {
            result: {
              data: {
                searchResults: {
                  threads: [
                    {
                      thread_items: [
                        {
                          post: {
                            id: "444444",
                            code: "CxGHI789",
                            caption: { text: "Claude Code is incredible for automation" },
                            user: { username: "carol_ai", pk: "10003" },
                            taken_at: 1712697000,
                            like_count: 256,
                            text_post_app_info: {},
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      ],
    ],
  ],
});

// Third script: branded content ad via text_post_app_info
const SAMPLE_JSON_3 = JSON.stringify({
  require: [
    [
      "RelayPrefetchedStreamCache",
      "next",
      [],
      [
        {
          __bbox: {
            result: {
              data: {
                mediaData: {
                  thread_items: [
                    {
                      post: {
                        id: "555555",
                        code: "CxBRAND1",
                        caption: { text: "Sponsored: check out our new tool" },
                        user: { username: "sponsor_co", pk: "30001" },
                        taken_at: 1712696000,
                        like_count: 9999,
                        text_post_app_info: {
                          is_branded_content: true,
                        },
                      },
                    },
                    {
                      // Post with no caption text - should be skipped
                      post: {
                        id: "666666",
                        code: "CxEMPTY1",
                        caption: { text: "" },
                        user: { username: "empty_user", pk: "40001" },
                        taken_at: 1712695000,
                        like_count: 10,
                        text_post_app_info: {},
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ],
    ],
  ],
});

const HIDDEN_JSON_HTML = `
<html><body>
<script type="application/json" data-sjs>${SAMPLE_JSON_1}</script>
<script type="application/json" data-sjs>${SAMPLE_JSON_2}</script>
<script type="application/json" data-sjs>${SAMPLE_JSON_3}</script>
</body></html>
`;

const win = new Window();
win.document.body.innerHTML = HIDDEN_JSON_HTML;

const g = globalThis as unknown as { document: unknown; window: unknown };
const prevDoc = g.document;
const prevWin = g.window;
g.document = win.document;
g.window = win;

const snippet = THREADS_SNIPPETS["threads.foryou.v1"];
if (!snippet) throw new Error("verify_threads: threads.foryou.v1 missing");

let items: ExtractionResult[];
try {
  const runnable = new Function(`return ${snippet};`) as () => string;
  const jsonStr = runnable();
  items = JSON.parse(jsonStr) as ExtractionResult[];
} finally {
  g.document = prevDoc;
  g.window = prevWin;
}

console.log(`hidden JSON extracted=${items.length}`);
assert(items.length === 3, `expected 3 items, got ${items.length}`);

const alice = items.find((i) => i.sourceId === "CxABC123");
const bob = items.find((i) => i.sourceId === "CxDEF456");
const carol = items.find((i) => i.sourceId === "CxGHI789");

assert(!!alice, "alice present");
assert(!!bob, "bob present");
assert(!!carol, "carol present (search-page threads wrapper)");

// Alice checks
assert(alice.author === "alice_dev", `alice author: ${alice.author}`);
assert(
  alice.url === "https://www.threads.net/@alice_dev/post/CxABC123",
  `alice url: ${alice.url}`,
);
assert(alice.text === "AI agents are changing everything in 2026", "alice text");
assert(alice.postedAt === 1712700000, `alice postedAt: ${alice.postedAt}`);
assert(alice.rawScore === 420, `alice rawScore: ${alice.rawScore}`);
assert(alice.title === null, "alice title null");

// Bob checks
assert(bob.rawScore === 1337, `bob rawScore: ${bob.rawScore}`);
assert(bob.postedAt === 1712698000, `bob postedAt: ${bob.postedAt}`);

// Carol checks (from "threads" wrapper)
assert(carol.author === "carol_ai", `carol author: ${carol.author}`);
assert(carol.rawScore === 256, `carol rawScore: ${carol.rawScore}`);

// Exclusions
assert(
  !items.some((i) => i.sourceId === "CxAD0001"),
  "is_paid_partnership ad must be excluded",
);
assert(
  !items.some((i) => i.sourceId === "CxBRAND1"),
  "branded content ad must be excluded",
);
assert(
  !items.some((i) => i.sourceId === "CxEMPTY1"),
  "empty caption post must be excluded",
);
// Duplicate alice should not appear twice
assert(
  items.filter((i) => i.sourceId === "CxABC123").length === 1,
  "duplicate deduplication",
);

console.log("✓ hidden JSON extraction (ads excluded, dedup, threads wrapper)");

// ---------- (2) Verify search snippet uses same logic ----------
const searchSnippet = THREADS_SNIPPETS["threads.search.v1"];
assert(!!searchSnippet, "threads.search.v1 snippet exists");
assert(
  searchSnippet === THREADS_SNIPPETS["threads.foryou.v1"],
  "search and foryou share same snippet",
);
console.log("✓ search snippet registered");

// ---------- (3) DOM fallback (no data-sjs scripts) ----------
const DOM_HTML = `
<html><body>
<div data-pressable-container>
  <a href="/@dave_coder/post/CxDOM001">link</a>
  <div dir="auto">DOM-only post about agentic coding</div>
  <time datetime="2026-04-10T08:00:00.000Z">5h</time>
</div>
<div data-pressable-container>
  <a href="/@eve_ml/post/CxDOM002">link</a>
  <div dir="auto">Another DOM post about LLMs</div>
</div>
<div data-pressable-container>
  <div dir="auto">Post without a link - should be skipped</div>
</div>
</body></html>
`;

const win2 = new Window();
win2.document.body.innerHTML = DOM_HTML;

g.document = win2.document;
g.window = win2;

let domItems: ExtractionResult[];
try {
  const runnable2 = new Function(`return ${snippet};`) as () => string;
  const jsonStr2 = runnable2();
  domItems = JSON.parse(jsonStr2) as ExtractionResult[];
} finally {
  g.document = prevDoc;
  g.window = prevWin;
}

console.log(`DOM fallback extracted=${domItems.length}`);
assert(domItems.length === 2, `expected 2 DOM items, got ${domItems.length}`);

const dave = domItems.find((i) => i.sourceId === "CxDOM001");
const eve = domItems.find((i) => i.sourceId === "CxDOM002");
assert(!!dave, "dave DOM post present");
assert(!!eve, "eve DOM post present");
assert(dave.author === "dave_coder", `dave author: ${dave.author}`);
assert(
  dave.url === "https://www.threads.net/@dave_coder/post/CxDOM001",
  `dave url: ${dave.url}`,
);
assert(dave.text === "DOM-only post about agentic coding", "dave text");
assert(dave.postedAt === "2026-04-10T08:00:00.000Z", `dave postedAt: ${dave.postedAt}`);
assert(dave.rawScore === 0, "dave rawScore=0 (DOM has no metrics)");

// After the fix, eve gets a unix-seconds fallback instead of null
assert(
  typeof eve.postedAt === "number" && eve.postedAt > 0,
  `eve postedAt should be a unix-sec fallback, got: ${eve.postedAt}`,
);

console.log("✓ DOM fallback extraction");

// ---------- (4) coerceRawToPost integration ----------
const now = Math.floor(Date.now() / 1000);
const post = coerceRawToPost(alice, "threads", now);
assert(post !== null, "coerce non-null");
assert(post.source === "threads", "source=threads");
assert(post.source_id === "CxABC123", "source_id = shortcode");
assert(post.author === "alice_dev", "post author");
assert(post.posted_at === 1712700000, `post posted_at: ${post.posted_at}`);
assert(post.score === 420, "post score propagated");
assert(post.url.includes("threads.net"), "post url");
console.log("✓ coerceRawToPost integration");

console.log("STEP6_VERIFY_PASS");
