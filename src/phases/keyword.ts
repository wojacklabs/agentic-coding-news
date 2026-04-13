// P3 keyword extraction: prompt builder + response parser.
// Claude L1 calls buildKeywordPrompt() with pre-scan texts, sends the
// result to itself (or uses it as inline reasoning), then hands the
// response to parseKeywords(). No external LLM call in this file.

import { SCROLL_BUDGET } from "../lib/mcp.ts";

const KEYWORD_COUNT = SCROLL_BUDGET.deepScanKeywordCount; // 3
const KEYWORD_RE = /^[a-z0-9가-힣 ]{2,20}$/;

/** Build the prompt that Claude L1 uses to pick deep-scan keywords. */
export function buildKeywordPrompt(texts: string[]): string {
  const sample = texts
    .slice(0, 50)
    .map((t) => t.slice(0, 200))
    .join("\n---\n");
  return [
    `Below are up to 50 social media posts scraped in this tick.`,
    `Pick exactly ${KEYWORD_COUNT} search keywords that would find more Claude Code deep-usage content (Skills, Subagents, Hooks, MCP, CLAUDE.md, settings.json, slash commands, plugins, ops patterns).`,
    `Rules:`,
    `- lowercase, 2-20 chars, ASCII or Korean Hangul only`,
    `- no generic words (ai, news, code, update, new)`,
    `- return ONLY a JSON array of strings, e.g. ["keyword1","keyword2","keyword3"]`,
    ``,
    `Posts:`,
    sample,
  ].join("\n");
}

/**
 * Parse Claude's keyword response. Returns up to KEYWORD_COUNT valid
 * keywords, or an empty array if the response is unparseable.
 * Does NOT throw — the caller should fall back to default keywords.
 */
export function parseKeywords(raw: string): string[] {
  const match = raw.match(/\[[\s\S]*?\]/);
  if (!match) return [];
  try {
    const parsed: unknown = JSON.parse(match[0]);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((v): v is string => typeof v === "string")
      .map((s) => s.toLowerCase().trim())
      .filter((s) => KEYWORD_RE.test(s))
      .slice(0, KEYWORD_COUNT);
  } catch {
    return [];
  }
}
