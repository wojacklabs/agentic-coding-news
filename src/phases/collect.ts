// P0+P1: RSS + HN + Reddit 일괄 수집.
// `bun run src/phases/collect.ts`로 단독 CLI 실행 가능.
// Claude L1이 /daily Bash phase에서 호출.

import { openDb } from "../lib/db.ts";
import { getRunId, logEvent } from "../lib/log.ts";
import { addCost, assertBudget } from "../lib/budget.ts";
import { fetchRss, normalizeRssItem } from "../sources/rss.ts";
import { fetchHnPosts } from "../sources/hn.ts";
import { fetchRedditPosts } from "../sources/reddit.ts";
import { insertPosts } from "../sources/persist.ts";
import { RSS_FEEDS, HN_KEYWORDS, REDDIT_SUBS } from "../config.ts";
import type { Post } from "../lib/types.ts";

export interface SourceResult {
  source: string;
  fetched: number;
  inserted: number;
  skipped: number;
  error: string | null;
}

export interface CollectResult {
  runId: string;
  sources: SourceResult[];
  totalInserted: number;
  totalSkipped: number;
}

export async function runCollect(): Promise<CollectResult> {
  const db = openDb();
  const runId = getRunId();

  // P0: budget gate — collect is $0 but abort if hard limit already hit
  assertBudget(0, db);
  logEvent(runId, "collect", "info", "P0+P1 start");

  const nowSec = Math.floor(Date.now() / 1000);

  // P1: three sources in parallel, individual failure isolation
  const settled = await Promise.allSettled([
    (async (): Promise<SourceResult> => {
      const raws = await fetchRss(RSS_FEEDS);
      const posts: Post[] = [];
      for (const r of raws) {
        const p = normalizeRssItem(r, nowSec);
        if (p) posts.push(p);
      }
      const ins = insertPosts(db, posts);
      return {
        source: "rss",
        fetched: raws.length,
        inserted: ins.inserted,
        skipped: ins.skipped,
        error: null,
      };
    })(),
    (async (): Promise<SourceResult> => {
      const posts = await fetchHnPosts({ keywords: HN_KEYWORDS });
      const ins = insertPosts(db, posts);
      return {
        source: "hn",
        fetched: posts.length,
        inserted: ins.inserted,
        skipped: ins.skipped,
        error: null,
      };
    })(),
    (async (): Promise<SourceResult> => {
      const posts = await fetchRedditPosts(REDDIT_SUBS);
      const ins = insertPosts(db, posts);
      return {
        source: "reddit",
        fetched: posts.length,
        inserted: ins.inserted,
        skipped: ins.skipped,
        error: null,
      };
    })(),
  ]);

  const sourceNames = ["rss", "hn", "reddit"] as const;
  const sources: SourceResult[] = settled.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : {
          source: sourceNames[i] ?? "unknown",
          fetched: 0,
          inserted: 0,
          skipped: 0,
          error: String(r.reason),
        },
  );

  const totalInserted = sources.reduce((s, r) => s + r.inserted, 0);
  const totalSkipped = sources.reduce((s, r) => s + r.skipped, 0);

  // Collect phase uses free endpoints — record $0 cost
  addCost(runId, "collect", 0, db);

  const hasErrors = sources.some((s) => s.error !== null);
  logEvent(
    runId,
    "collect",
    hasErrors ? "warn" : "info",
    "P0+P1 done",
    { totalInserted, totalSkipped, sources },
  );

  db.close();
  return { runId, sources, totalInserted, totalSkipped };
}

if (import.meta.main) {
  const result = await runCollect();
  console.log(JSON.stringify(result, null, 2));
}
