import {
  buildKeywordPrompt,
  parseKeywords,
} from "../src/phases/keyword.ts";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`verify_keyword: ${msg}`);
}

// --- (1) prompt exists and includes key instruction ---
const prompt = buildKeywordPrompt([
  "Claude Code is great for automation",
  "Agentic workflows are the future",
]);
assert(prompt.includes("exactly 3"), "prompt has count");
assert(prompt.includes("Claude Code"), "prompt has sample text");
console.log(`✓ buildKeywordPrompt (${prompt.length} chars)`);

// --- (2) valid JSON array ---
const v1 = parseKeywords('["claude code","agentic","cursor"]');
assert(v1.length === 3, `v1 length: ${v1.length}`);
assert(v1[0] === "claude code", `v1[0]: ${v1[0]}`);
console.log(`✓ parseKeywords normal: ${JSON.stringify(v1)}`);

// --- (3) markdown wrapped ---
const v2 = parseKeywords(
  "Here are the keywords:\n```json\n[\"bun runtime\",\"local llm\",\"mcp protocol\"]\n```",
);
assert(v2.length === 3, `v2 length: ${v2.length}`);
console.log(`✓ parseKeywords markdown-wrapped: ${JSON.stringify(v2)}`);

// --- (4) uppercase normalization ---
const v3 = parseKeywords('["Claude CODE","RAG","OPUS"]');
assert(v3[0] === "claude code", `v3[0]: ${v3[0]}`);
console.log(`✓ parseKeywords uppercase normalized`);

// --- (5) length filter ---
const v4 = parseKeywords(
  '["a","valid keyword","' + "x".repeat(21) + '"]',
);
assert(v4.length === 1, `v4 length: ${v4.length}`);
assert(v4[0] === "valid keyword", `v4[0]: ${v4[0]}`);
console.log("✓ parseKeywords length filter");

// --- (6) korean ---
const v5 = parseKeywords('["에이전트 코딩","클로드 코드","llm"]');
assert(v5.length === 3, `v5 length: ${v5.length}`);
console.log(`✓ parseKeywords korean: ${JSON.stringify(v5)}`);

// --- (7) no JSON → empty (no throw) ---
const v6 = parseKeywords("no json here at all");
assert(v6.length === 0, "empty on no JSON");
console.log("✓ parseKeywords graceful on garbage");

// --- (8) empty array → empty ---
const v7 = parseKeywords("[]");
assert(v7.length === 0, "empty on []");
console.log("✓ parseKeywords empty array");

// --- (9) excess → capped at 3 ---
const v8 = parseKeywords('["aa","bb","cc","dd","ee"]');
assert(v8.length === 3, `v8 length: ${v8.length}`);
console.log("✓ parseKeywords capped at 3");

// --- (10) special chars rejected ---
const v9 = parseKeywords('["valid one","!!invalid!!","good two"]');
assert(v9.length === 2, `v9 length: ${v9.length}`);
console.log("✓ parseKeywords special chars rejected");

console.log("STEP8_VERIFY_KEYWORD_PASS");
