// E2E pipeline verification — no OpenAI, no git.
// Sets DB_PATH to temp file, injects mock embed fetcher.

import { rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const PROJECT_ROOT = resolve(import.meta.dir, "..");
const TMP_DB = resolve(PROJECT_ROOT, "db/verify_pipeline.db");

// Set env BEFORE importing modules that read it at load time
process.env.DB_PATH = TMP_DB;

function cleanup() {
  for (const s of ["", "-wal", "-shm", "-journal"]) {
    try {
      rmSync(TMP_DB + s);
    } catch {
      /* noop */
    }
  }
  // Remove test markdown
  const postsDir = resolve(PROJECT_ROOT, "posts");
  try {
    const today = new Date(Date.now() + 9 * 3_600_000)
      .toISOString()
      .slice(0, 10);
    rmSync(resolve(postsDir, `${today}.md`));
  } catch {
    /* noop */
  }
}
cleanup();

// Dynamic imports after env is set
const { openDb, toVecBlob } = await import("../src/lib/db.ts");
const { insertPosts } = await import("../src/sources/persist.ts");
const { runEmbed } = await import("../src/phases/embed.ts");
const { runDedupe } = await import("../src/phases/dedupe.ts");
const {
  buildArticlePrompt,
  parseArticle,
} = await import("../src/phases/rank.ts");
const { renderAndSave } = await import("../src/phases/render.ts");
const { runPublish } = await import("../src/phases/publish.ts");

import type { Post } from "../src/lib/types.ts";
import type { EmbedFetcher } from "../src/phases/embed.ts";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`verify_pipeline: ${msg}`);
}

// --- Mock embed fetcher: deterministic 256d unit vectors ---
const mockEmbedFetcher: EmbedFetcher = async (texts) => {
  const embeddings = texts.map((_, i) => {
    const vec = new Array(256).fill(0) as number[];
    vec[i % 256] = 1.0;
    return vec;
  });
  return {
    embeddings,
    totalTokens: texts.reduce((s, t) => s + Math.ceil(t.length / 4), 0),
  };
};

// --- (1) Seed posts ---
const db = openDb();
const now = Math.floor(Date.now() / 1000);
const posts: Post[] = [
  {
    source: "hn",
    source_id: "pipe-1",
    url: "https://example.com/1",
    author: "alice",
    title: "Claude Code ships MCP",
    text: "Anthropic released the MCP protocol for agentic coding workflows",
    lang: "en",
    posted_at: now - 3600,
    fetched_at: now,
    score: 42,
  },
  {
    source: "reddit",
    source_id: "pipe-2",
    url: "https://example.com/2",
    author: "bob",
    title: "Cursor vs Copilot 2026",
    text: "Detailed comparison of AI coding assistants in 2026 edition",
    lang: "en",
    posted_at: now - 7200,
    fetched_at: now,
    score: 38,
  },
  {
    source: "rss",
    source_id: "pipe-3",
    url: "https://example.com/3",
    author: "carol",
    title: "Local LLM fine-tuning guide",
    text: "Step-by-step guide for fine-tuning open-source LLMs locally",
    lang: "en",
    posted_at: now - 1800,
    fetched_at: now,
    score: 55,
  },
];
const ins = insertPosts(db, posts);
console.log(`[1] seed: inserted=${ins.inserted}`);
assert(ins.inserted === 3, "3 posts inserted");
db.close();

// --- (2) Embed ---
const embedResult = await runEmbed(mockEmbedFetcher);
console.log(`[2] embed: embedded=${embedResult.embedded}`);
assert(embedResult.embedded === 3, "3 posts embedded");

// --- (3) Dedupe (cold start = all pass) ---
const dedupeResult = runDedupe();
console.log(
  `[3] dedupe: passed=${dedupeResult.candidates.length} dropped=${dedupeResult.dropped}`,
);
assert(dedupeResult.candidates.length === 3, "all 3 pass cold start");

// --- (4) Rank prompt + mock response ---
const prompt = buildArticlePrompt(
  dedupeResult.candidates.map((c) => ({ ...c })),
  "2026-04-12",
);
assert(prompt.includes("agentic-coding"), "prompt mentions topic");
console.log(`[4] rank prompt: ${prompt.length} chars`);

const mockLlmResponse = JSON.stringify({
  title: "에이전틱 코딩 뉴스 4월 12일",
  summary: "MCP 프로토콜 출시, AI 코딩 도구 비교, 로컬 LLM 파인튜닝 가이드",
  bodyMd:
    "## MCP 프로토콜 출시\n\nAnthropic이 에이전틱 코딩을 위한 MCP 프로토콜을 공개했습니다. [1](https://example.com/1)\n\n## AI 코딩 도구 비교\n\nCursor와 Copilot의 2026년 비교 리뷰입니다. [2](https://example.com/2)\n\n## 로컬 LLM 파인튜닝\n\n오픈소스 LLM 파인튜닝 가이드가 공개되었습니다. [3](https://example.com/3)",
  usedIndices: [1, 2, 3],
});
const article = parseArticle(
  mockLlmResponse,
  dedupeResult.candidates.map((c) => ({ ...c })),
);
assert(article !== null, "parseArticle success");
assert(article.postIds.length === 3, `postIds: ${article.postIds.length}`);
console.log(`[4] rank parsed: "${article.title}"`);

// --- (5) Render ---
const rendered = renderAndSave(article, 1);
console.log(
  `[5] render: slug=${rendered.slug}, articleId=${rendered.articleId}`,
);
assert(rendered.articleId > 0, "article has id");
assert(existsSync(rendered.mdPath), "md file exists");

// --- (6) Publish (dry run) ---
await runPublish({
  articleId: rendered.articleId,
  mdPath: rendered.mdPath,
  title: article.title,
  dryRun: true,
});

const db2 = openDb();
const vecCount =
  db2
    .query<{ c: number }, []>(
      "SELECT COUNT(*) AS c FROM articles_vec",
    )
    .get()?.c ?? 0;
const artRow = db2
  .query<{ status: string }, [number]>(
    "SELECT status FROM articles WHERE id = ?",
  )
  .get(rendered.articleId);
db2.close();

console.log(`[6] publish: articles_vec=${vecCount}, status=${artRow?.status}`);
assert(vecCount === 1, "articles_vec has 1 row");
assert(artRow?.status === "published", "status=published");

cleanup();
console.log("\nSTEP9_VERIFY_PIPELINE_PASS");
