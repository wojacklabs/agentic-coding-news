// P9: article → markdown file append + articles table INSERT.
// `bun run src/phases/render.ts` (reads JSON from stdin).

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { openDb } from "../lib/db.ts";
import { getRunId, logEvent } from "../lib/log.ts";
import type { ArticleOutput } from "./rank.ts";

const PROJECT_ROOT = resolve(import.meta.dir, "..", "..");
const POSTS_DIR = resolve(PROJECT_ROOT, "posts");

function kstDateStr(): string {
  const shifted = new Date(Date.now() + 9 * 3_600_000);
  return shifted.toISOString().slice(0, 10);
}

function kstTimeStr(): string {
  const shifted = new Date(Date.now() + 9 * 3_600_000);
  return shifted.toISOString().slice(11, 16);
}

export function renderAndSave(
  article: ArticleOutput,
  tickNum: number,
): { slug: string; mdPath: string; articleId: number } {
  const db = openDb();
  const runId = getRunId();
  const dateStr = kstDateStr();
  const slug = `${dateStr}-tick-${String(tickNum).padStart(2, "0")}`;
  const mdPath = resolve(POSTS_DIR, `${dateStr}.md`);

  mkdirSync(POSTS_DIR, { recursive: true });

  // File header if new — includes Jekyll front matter for GitHub Pages
  if (!existsSync(mdPath)) {
    writeFileSync(
      mdPath,
      `---\nlayout: default\ntitle: "${dateStr} 에이전틱 코딩 뉴스"\n---\n\n# Agentic Coding News — ${dateStr}\n\n`,
      "utf8",
    );
  }

  // Tick section
  const section = [
    `## Tick ${tickNum} (${kstTimeStr()} KST)`,
    "",
    `### ${article.title}`,
    "",
    `> ${article.summary}`,
    "",
    article.bodyMd,
    "",
    "---",
    "",
  ].join("\n");

  const existing = readFileSync(mdPath, "utf8");
  writeFileSync(mdPath, existing + section, "utf8");

  // articles table
  const nowSec = Math.floor(Date.now() / 1000);
  db.query(
    `INSERT OR REPLACE INTO articles(slug, title, summary, body_md, status, created_at)
     VALUES (?, ?, ?, ?, 'draft', ?)`,
  ).run(slug, article.title, article.summary, article.bodyMd, nowSec);

  const idRow = db
    .query<{ id: number }, [string]>(
      "SELECT id FROM articles WHERE slug = ?",
    )
    .get(slug);
  const articleId = idRow?.id ?? 0;

  logEvent(runId, "render", "info", `P9: ${slug}`, { articleId, mdPath });
  db.close();
  return { slug, mdPath, articleId };
}

if (import.meta.main) {
  const input = await Bun.stdin.text();
  const data = JSON.parse(input) as ArticleOutput & { tickNum: number };
  const r = renderAndSave(data, data.tickNum);
  console.log(JSON.stringify(r));
}
