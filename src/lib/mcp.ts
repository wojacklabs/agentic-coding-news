// Chrome MCP protocol types and constants.
//
// This file never calls the MCP tools. The `mcp__claude-in-chrome__*` symbols
// do not exist in the Bun runtime — they are only available inside a Claude
// Code session. The actual calls are issued by Claude L1 when it runs the
// `/daily` slash command (see `.claude/commands/daily.md` added in Step 10).
//
// Everything exported here is pure data: types, constants, and total
// functions without side effects.

import type { Source } from "./types.ts";

/** Whitelist of Chrome MCP tools that Claude L1 is allowed to call. */
export type ChromeMcpTool =
  | "mcp__claude-in-chrome__tabs_context_mcp"
  | "mcp__claude-in-chrome__tabs_create_mcp"
  | "mcp__claude-in-chrome__navigate"
  | "mcp__claude-in-chrome__javascript_tool"
  | "mcp__claude-in-chrome__get_page_text"
  | "mcp__claude-in-chrome__read_console_messages";

export const CHROME_MCP_TOOLS: readonly ChromeMcpTool[] = [
  "mcp__claude-in-chrome__tabs_context_mcp",
  "mcp__claude-in-chrome__tabs_create_mcp",
  "mcp__claude-in-chrome__navigate",
  "mcp__claude-in-chrome__javascript_tool",
  "mcp__claude-in-chrome__get_page_text",
  "mcp__claude-in-chrome__read_console_messages",
] as const;

/**
 * Scroll budget per source. The math:
 *   preScanMax + deepScanPerKeywordMax * deepScanKeywordCount + bufferMax
 *   = 6 + 4*3 + 2 = 20 = perSourceMax
 */
export const SCROLL_BUDGET = {
  perSourceMax: 25,       // X: 10+5*3=25 (largest)
  preScanMax: 10,         // X: 10, Threads: 8
  deepScanPerKeywordMax: 5,
  deepScanKeywordCount: 3, // X: 3, Threads: 2
  bufferMax: 0,
} as const;

export const TIMEOUTS = {
  navigateMs: 15_000,
  waitAfterScrollMs: 1_200,
  jsExecMs: 8_000,
  perSourceHardMs: 180_000, // 3 minutes per source
} as const;

/** A single step in a navigation plan. */
export type NavigationStep =
  | {
      readonly kind: "navigate";
      readonly url: string;
      readonly waitMs?: number;
    }
  | { readonly kind: "wait"; readonly ms: number }
  | {
      readonly kind: "scroll";
      readonly times: number;
      readonly pauseMs?: number;
    }
  | {
      readonly kind: "extract";
      /** Lookup key for the JS snippet registered in src/sources/{x,threads}.ts */
      readonly jsSnippetRef: string;
      /** Bucket name that Claude L1 accumulates results under. */
      readonly saveTo: string;
    };

/** Shape that each javascript_tool extraction snippet must return for one item. */
export interface ExtractionResult {
  readonly sourceId: string;
  readonly url: string;
  readonly author: string | null;
  readonly title: string | null;
  readonly text: string;
  /** ISO8601 string, unix seconds, or unix milliseconds. Normalised by extract.ts. */
  readonly postedAt: string | number | null;
  readonly rawScore: number | null;
  readonly lang?: string | null;
}

/** One full navigation plan for a source (X or Threads). */
export interface NavigationPlan {
  readonly sourceName: Extract<Source, "x" | "threads">;
  readonly slug: string;
  readonly openNewTab: boolean;
  readonly preScanSteps: readonly NavigationStep[];
  readonly buildDeepScanSteps: (
    keyword: string,
  ) => readonly NavigationStep[];
  readonly budget: {
    readonly scrollsMax: number;
    readonly timeoutMs: number;
  };
}

/**
 * Sentinel keyword used by `assertPlanBudget` to drive a dry run of
 * `buildDeepScanSteps`. Every plan's `buildDeepScanSteps` MUST be a
 * pure function whose scroll count is independent of the keyword
 * value; the budget check relies on this invariant.
 */
export const SAMPLE_KEYWORD = "__sample__";

function countScrolls(steps: readonly NavigationStep[]): number {
  let n = 0;
  for (const s of steps) if (s.kind === "scroll") n += s.times;
  return n;
}

/** Runtime invariant check for a single plan. */
export function assertPlanBudget(plan: NavigationPlan): void {
  const preScrolls = countScrolls(plan.preScanSteps);
  if (preScrolls > SCROLL_BUDGET.preScanMax) {
    throw new Error(
      `plan ${plan.slug}: preScan scrolls=${preScrolls} > ${SCROLL_BUDGET.preScanMax}`,
    );
  }
  const sampleDeep = plan.buildDeepScanSteps(SAMPLE_KEYWORD);
  const deepScrollsPerKw = countScrolls(sampleDeep);
  if (deepScrollsPerKw > SCROLL_BUDGET.deepScanPerKeywordMax) {
    throw new Error(
      `plan ${plan.slug}: deepScan per-keyword scrolls=${deepScrollsPerKw} > ${SCROLL_BUDGET.deepScanPerKeywordMax}`,
    );
  }
  const total =
    preScrolls +
    deepScrollsPerKw * SCROLL_BUDGET.deepScanKeywordCount +
    SCROLL_BUDGET.bufferMax;
  if (total > plan.budget.scrollsMax) {
    throw new Error(
      `plan ${plan.slug}: total scrolls=${total} > budget.scrollsMax=${plan.budget.scrollsMax}`,
    );
  }
  if (plan.budget.scrollsMax > SCROLL_BUDGET.perSourceMax) {
    throw new Error(
      `plan ${plan.slug}: budget ${plan.budget.scrollsMax} > hard max ${SCROLL_BUDGET.perSourceMax}`,
    );
  }
  if (
    plan.budget.timeoutMs <= 0 ||
    plan.budget.timeoutMs > TIMEOUTS.perSourceHardMs
  ) {
    throw new Error(`plan ${plan.slug}: timeoutMs=${plan.budget.timeoutMs}`);
  }
}

/* ---------- Placeholder plans — filled in further during Steps 5 & 6 ---------- */

export const X_PLAN: NavigationPlan = {
  sourceName: "x",
  slug: "x-home",
  openNewTab: true,
  preScanSteps: [
    {
      kind: "navigate",
      url: "https://x.com/search?q=%22claude%20code%22&f=live",
      waitMs: TIMEOUTS.navigateMs,
    },
    {
      kind: "scroll",
      times: 10, // pre-scan: 10 scrolls
      pauseMs: TIMEOUTS.waitAfterScrollMs,
    },
    { kind: "extract", jsSnippetRef: "x.timeline.v1", saveTo: "x.prescan" },
  ],
  buildDeepScanSteps: (keyword: string) => [
    {
      kind: "navigate",
      url: `https://x.com/search?q=${encodeURIComponent(keyword)}&f=live`,
      waitMs: TIMEOUTS.navigateMs,
    },
    {
      kind: "scroll",
      times: 5, // deep-scan: 5 scrolls per keyword × 3 keywords
      pauseMs: TIMEOUTS.waitAfterScrollMs,
    },
    {
      kind: "extract",
      jsSnippetRef: "x.search.v1",
      saveTo: `x.deep.${keyword}`,
    },
  ],
  budget: {
    scrollsMax: 25, // 10 + 5*3 = 25
    timeoutMs: TIMEOUTS.perSourceHardMs,
  },
};

export const THREADS_PLAN: NavigationPlan = {
  sourceName: "threads",
  slug: "threads-foryou",
  openNewTab: true,
  preScanSteps: [
    {
      kind: "navigate",
      url: "https://www.threads.net/search?q=claudecode&serp_type=tags",
      waitMs: TIMEOUTS.navigateMs,
    },
    {
      kind: "scroll",
      times: 8, // pre-scan: 8 scrolls on #aithreads
      pauseMs: TIMEOUTS.waitAfterScrollMs,
    },
    {
      kind: "extract",
      jsSnippetRef: "threads.foryou.v1",
      saveTo: "threads.prescan",
    },
  ],
  buildDeepScanSteps: (keyword: string) => [
    {
      kind: "navigate",
      url: `https://www.threads.net/search?q=${encodeURIComponent(keyword)}&serp_type=default`,
      waitMs: TIMEOUTS.navigateMs,
    },
    {
      kind: "scroll",
      times: 5, // deep-scan: 5 scrolls per keyword × 2 keywords
      pauseMs: TIMEOUTS.waitAfterScrollMs,
    },
    {
      kind: "extract",
      jsSnippetRef: "threads.search.v1",
      saveTo: `threads.deep.${keyword}`,
    },
  ],
  budget: {
    scrollsMax: 18, // 8 + 5*2 = 18
    timeoutMs: TIMEOUTS.perSourceHardMs,
  },
};

export const NAV_PLANS: readonly NavigationPlan[] = [
  X_PLAN,
  THREADS_PLAN,
] as const;
