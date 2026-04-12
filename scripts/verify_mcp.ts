import {
  CHROME_MCP_TOOLS,
  NAV_PLANS,
  SAMPLE_KEYWORD,
  SCROLL_BUDGET,
  TIMEOUTS,
  THREADS_PLAN,
  X_PLAN,
  assertPlanBudget,
  type ChromeMcpTool,
  type NavigationStep,
} from "../src/lib/mcp.ts";
import {
  coerceBatch,
  coerceRawToPost,
  dedupeBySourceId,
} from "../src/lib/extract.ts";
import type { Post } from "../src/lib/types.ts";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`verify_mcp: ${msg}`);
}

// (1) ChromeMcpTool whitelist integrity
const EXPECTED: ChromeMcpTool[] = [
  "mcp__claude-in-chrome__tabs_context_mcp",
  "mcp__claude-in-chrome__tabs_create_mcp",
  "mcp__claude-in-chrome__navigate",
  "mcp__claude-in-chrome__javascript_tool",
  "mcp__claude-in-chrome__get_page_text",
  "mcp__claude-in-chrome__read_console_messages",
];
assert(CHROME_MCP_TOOLS.length === EXPECTED.length, "tool count mismatch");
for (const t of EXPECTED) {
  assert(CHROME_MCP_TOOLS.includes(t), `missing tool: ${t}`);
}
for (const t of CHROME_MCP_TOOLS) {
  assert(t.startsWith("mcp__claude-in-chrome__"), `bad prefix: ${t}`);
}
console.log(`✓ CHROME_MCP_TOOLS (${CHROME_MCP_TOOLS.length} tools)`);

// (2) Scroll/timeout constants consistency
assert(SCROLL_BUDGET.perSourceMax === 25, "perSourceMax should be 25");
const budgetMath =
  SCROLL_BUDGET.preScanMax +
  SCROLL_BUDGET.deepScanPerKeywordMax * SCROLL_BUDGET.deepScanKeywordCount +
  SCROLL_BUDGET.bufferMax;
assert(
  budgetMath === SCROLL_BUDGET.perSourceMax,
  `budget math: ${budgetMath} != ${SCROLL_BUDGET.perSourceMax}`,
);
assert(TIMEOUTS.navigateMs > 0, "navigateMs > 0");
assert(TIMEOUTS.jsExecMs > 0, "jsExecMs > 0");
assert(
  TIMEOUTS.perSourceHardMs >= TIMEOUTS.navigateMs,
  "perSourceHardMs must cover navigateMs",
);
console.log("✓ SCROLL_BUDGET + TIMEOUTS");

// (3) Plan structural checks
assert(NAV_PLANS.length === 2, `NAV_PLANS count: ${NAV_PLANS.length}`);
assert(NAV_PLANS.includes(X_PLAN), "X_PLAN not registered");
assert(NAV_PLANS.includes(THREADS_PLAN), "THREADS_PLAN not registered");
const slugSet = new Set(NAV_PLANS.map((p) => p.slug));
assert(slugSet.size === NAV_PLANS.length, "plan slugs must be unique");
console.log(`✓ slug uniqueness (${[...slugSet].join(", ")})`);

for (const plan of NAV_PLANS) {
  assertPlanBudget(plan);
  assert(plan.preScanSteps.length > 0, `${plan.slug}: empty preScan`);
  assert(
    plan.preScanSteps.some((s: NavigationStep) => s.kind === "navigate"),
    `${plan.slug}: preScan needs navigate`,
  );
  assert(
    plan.preScanSteps.some((s: NavigationStep) => s.kind === "extract"),
    `${plan.slug}: preScan needs extract`,
  );
  const deepSample = plan.buildDeepScanSteps("sample-kw");
  assert(deepSample.length > 0, `${plan.slug}: deepScan empty`);
  assert(
    deepSample.some((s: NavigationStep) => s.kind === "navigate"),
    `${plan.slug}: deepScan needs navigate`,
  );
  assert(
    deepSample.some((s: NavigationStep) => s.kind === "extract"),
    `${plan.slug}: deepScan needs extract`,
  );
  // Deep-scan URL must reflect the keyword
  const navStep = deepSample.find((s) => s.kind === "navigate");
  if (navStep && navStep.kind === "navigate") {
    assert(
      navStep.url.includes("sample-kw"),
      `${plan.slug}: keyword not propagated into url (${navStep.url})`,
    );
  }
  console.log(`✓ plan ${plan.slug}: structure + budget`);
}

// (4) extract helpers — ISO string path
const now = Math.floor(Date.UTC(2026, 3, 11, 0, 0, 0) / 1000);
const post1 = coerceRawToPost(
  {
    sourceId: "t-1",
    url: "https://x.com/u/status/t-1",
    author: "u",
    title: null,
    text: "  hello agentic  ",
    postedAt: "2026-04-10T23:00:00Z",
    rawScore: 42,
  },
  "x",
  now,
);
assert(post1 !== null, "coerce should return a Post");
assert(post1.text === "hello agentic", `text not trimmed: "${post1.text}"`);
assert(
  post1.posted_at === Math.floor(Date.UTC(2026, 3, 10, 23, 0, 0) / 1000),
  `posted_at parse: ${post1.posted_at}`,
);
assert(post1.score === 42, `score: ${post1.score}`);
console.log("✓ coerceRawToPost ISO-string input");

// (5) extract helpers — ms epoch path
const post2 = coerceRawToPost(
  {
    sourceId: "t-2",
    url: "https://x.com/u/status/t-2",
    author: null,
    title: null,
    text: "x",
    postedAt: Date.UTC(2026, 3, 10, 23, 0, 0),
    rawScore: null,
  },
  "x",
  now,
);
assert(post2 !== null && post2.score === 0, "ms epoch + null score");
console.log("✓ coerceRawToPost ms-epoch input");

// (6) Invalid inputs are rejected — empty id, bad date, whitespace text
const badId = coerceRawToPost(
  {
    sourceId: "",
    url: "u",
    author: null,
    title: null,
    text: "t",
    postedAt: "2026-04-10T00:00:00Z",
    rawScore: 0,
  },
  "x",
  now,
);
assert(badId === null, "empty sourceId should be rejected");

const badDate = coerceRawToPost(
  {
    sourceId: "a",
    url: "u",
    author: null,
    title: null,
    text: "t",
    postedAt: "not-a-date",
    rawScore: 0,
  },
  "x",
  now,
);
assert(badDate === null, "bad date should be rejected");

const badWs = coerceRawToPost(
  {
    sourceId: "a",
    url: "u",
    author: null,
    title: null,
    text: "   \n\t  ",
    postedAt: "2026-04-10T00:00:00Z",
    rawScore: 0,
  },
  "x",
  now,
);
assert(badWs === null, "whitespace-only text should be rejected");

// Numeric-string postedAt is NOT a valid epoch; treated as bad date
const badNumericStr = coerceRawToPost(
  {
    sourceId: "a",
    url: "u",
    author: null,
    title: null,
    text: "t",
    postedAt: "1712700000",
    rawScore: 0,
  },
  "x",
  now,
);
assert(badNumericStr === null, "numeric-string postedAt rejected (ISO only)");
console.log("✓ invalid input rejection (id / date / whitespace / numeric-str)");

// (7) dedupeBySourceId keeps higher score, respects (source, source_id),
//     later wins on tie, handles negative scores
const a: Post = { ...post1, score: 10 };
const b: Post = { ...post1, score: 42 };
const c: Post = { ...post1, source_id: "t-different", score: 1 };
const dup = dedupeBySourceId([a, b, c]);
assert(dup.length === 2, `dedupe count: ${dup.length}`);
const keptT1 = dup.find((p) => p.source_id === "t-1");
assert(keptT1?.score === 42, `kept score: ${keptT1?.score}`);

const xSame: Post = { ...post1, source: "x", source_id: "same" };
const thSame: Post = { ...post1, source: "threads", source_id: "same" };
assert(dedupeBySourceId([xSame, thSame]).length === 2, "cross-source dedupe");

// Tie-break: later wins on equal score
const tie1: Post = { ...post1, source_id: "tie", score: 5, text: "earlier" };
const tie2: Post = { ...post1, source_id: "tie", score: 5, text: "later" };
const tieOut = dedupeBySourceId([tie1, tie2]);
assert(tieOut.length === 1, "tie dedupe count");
assert(tieOut[0]!.text === "later", `tie-break kept: ${tieOut[0]!.text}`);

// Negative score accepted (not dropped)
const neg: Post = { ...post1, source_id: "neg", score: -5 };
assert(dedupeBySourceId([neg]).length === 1, "negative score kept");
console.log("✓ dedupeBySourceId (tie-break + cross-source + negative)");

// SAMPLE_KEYWORD is a real export
assert(typeof SAMPLE_KEYWORD === "string" && SAMPLE_KEYWORD.length > 0, "SAMPLE_KEYWORD");

// (8) coerceBatch drops invalid + dedupes
const batch = coerceBatch(
  [
    {
      sourceId: "b-1",
      url: "u",
      author: null,
      title: null,
      text: "hi",
      postedAt: "2026-04-10T00:00:00Z",
      rawScore: 5,
    },
    {
      sourceId: "b-1",
      url: "u",
      author: null,
      title: null,
      text: "dup",
      postedAt: "2026-04-10T00:00:00Z",
      rawScore: 1,
    },
    {
      sourceId: "",
      url: "u",
      author: null,
      title: null,
      text: "drop",
      postedAt: null,
      rawScore: 0,
    },
  ],
  "x",
  now,
);
assert(batch.length === 1, `coerceBatch length: ${batch.length}`);
assert(batch[0]!.score === 5, "coerceBatch kept higher score");
console.log("✓ coerceBatch drop + dedupe");

console.log("STEP4_VERIFY_PASS");
