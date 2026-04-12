// Bun-only orchestrator — runs the full pipeline without Chrome MCP.
// `bun run src/index.ts` as a standalone fallback when daily.md is unavailable.

import { runCollect } from "./phases/collect.ts";
import { runEmbed } from "./phases/embed.ts";
import { runDedupe } from "./phases/dedupe.ts";
import { buildArticlePrompt, parseArticle } from "./phases/rank.ts";
import { renderAndSave } from "./phases/render.ts";
import { runPublish } from "./phases/publish.ts";
import { openDb } from "./lib/db.ts";
import { getRunId, logEvent } from "./lib/log.ts";

function kstDateStr(): string {
  return new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10);
}

function getTickNum(dateStr: string): number {
  const db = openDb();
  const row = db
    .query<{ c: number }, [string]>(
      "SELECT COUNT(*) AS c FROM articles WHERE slug LIKE ? || '%'",
    )
    .get(dateStr);
  db.close();
  return (row?.c ?? 0) + 1;
}

const dryRun = process.argv.includes("--dry-run");

async function main(): Promise<void> {
  const runId = getRunId();
  const dateStr = kstDateStr();
  logEvent(runId, "index", "info", `tick start ${dateStr}`, { dryRun });

  // P0+P1: Collect
  const collect = await runCollect();
  console.log(`[collect] inserted=${collect.totalInserted} skipped=${collect.totalSkipped}`);

  // P6: Embed (graceful skip when OPENAI_API_KEY is missing)
  let embed = { embedded: 0, cost: 0 };
  try {
    embed = await runEmbed();
  } catch (e) {
    logEvent(runId, "index", "warn", `embed skipped: ${e}`);
    console.warn(`[embed] skipped: ${e}`);
  }
  console.log(`[embed] embedded=${embed.embedded} cost=$${embed.cost.toFixed(4)}`);

  // P7: Dedupe
  const dedupe = runDedupe();
  console.log(`[dedupe] candidates=${dedupe.candidates.length} dropped=${dedupe.dropped}`);

  if (dedupe.candidates.length === 0) {
    console.log("[done] no new candidates — skipping article generation");
    return;
  }

  // P8: Article prompt (no LLM call — print for manual use)
  const prompt = buildArticlePrompt(dedupe.candidates, dateStr);
  console.log("[rank] article prompt built, awaiting LLM response...");

  // In Bun-only mode there is no LLM. Write a placeholder article.
  const placeholder = JSON.stringify({
    title: `${dateStr} Agentic Coding News`,
    summary: `오늘의 AI 코딩 뉴스 ${dedupe.candidates.length}건 요약`,
    bodyMd: dedupe.candidates
      .slice(0, 10)
      .map((c, i) => `- [${i + 1}] [${c.title ?? c.source}](${c.url})`)
      .join("\n"),
    usedIndices: dedupe.candidates.slice(0, 10).map((_, i) => i + 1),
  });

  const article = parseArticle(placeholder, dedupe.candidates);
  if (!article) {
    logEvent(runId, "index", "error", "article parse failed");
    console.error("[error] article parse failed");
    process.exit(1);
  }

  // P9: Render
  const tickNum = getTickNum(dateStr);
  const rendered = renderAndSave(article, tickNum);
  console.log(`[render] slug=${rendered.slug} path=${rendered.mdPath}`);

  // P10: Publish
  const published = await runPublish({
    articleId: rendered.articleId,
    mdPath: rendered.mdPath,
    title: article.title,
    dryRun,
  });
  console.log(`[publish] pushed=${published.pushed}`);

  logEvent(runId, "index", "info", "tick done", {
    slug: rendered.slug,
    pushed: published.pushed,
  });
}

await main();
