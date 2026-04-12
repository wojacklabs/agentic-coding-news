// P5: Read Chrome MCP extraction results (JSONL) → coerceBatch → insertPosts.
// `bun run src/phases/ingest_mcp.ts <rawDir>`
// Claude L1 calls this after writing JSONL files via Write tool.

import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { openDb } from "../lib/db.ts";
import { getRunId, logEvent } from "../lib/log.ts";
import { coerceBatch } from "../lib/extract.ts";
import { insertPosts } from "../sources/persist.ts";
import type { ExtractionResult } from "../lib/mcp.ts";
import type { Source } from "../lib/types.ts";

const SOURCE_MAP: Record<string, Source> = {
  x: "x",
  threads: "threads",
};

function parseJsonlFile(path: string): ExtractionResult[] {
  const content = readFileSync(path, "utf8").trim();
  if (!content) return [];
  const results: ExtractionResult[] = [];
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        results.push(...(parsed as ExtractionResult[]));
      } else {
        results.push(parsed as ExtractionResult);
      }
    } catch { /* skip malformed lines */ }
  }
  return results;
}

function inferSource(filename: string): Source | null {
  for (const [prefix, source] of Object.entries(SOURCE_MAP)) {
    if (filename.startsWith(prefix)) return source;
  }
  return null;
}

function main(): void {
  const rawDir = process.argv[2];
  if (!rawDir) throw new Error("usage: ingest_mcp.ts <rawDir>");

  const dir = resolve(rawDir);
  const runId = getRunId();
  const db = openDb();
  const fetchedAt = Math.floor(Date.now() / 1000);

  let totalInserted = 0;
  let totalSkipped = 0;

  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".jsonl"));
  } catch {
    logEvent(runId, "ingest_mcp", "info", `no raw dir: ${dir}`);
    db.close();
    console.log(JSON.stringify({ inserted: 0, skipped: 0, files: 0 }));
    return;
  }

  for (const file of files) {
    const source = inferSource(file);
    if (!source) continue;
    const raws = parseJsonlFile(resolve(dir, file));
    if (raws.length === 0) continue;
    const posts = coerceBatch(raws, source, fetchedAt);
    const result = insertPosts(db, posts);
    totalInserted += result.inserted;
    totalSkipped += result.skipped;
    logEvent(runId, "ingest_mcp", "info", `${file}: ${result.inserted} inserted`, {
      source,
      raw: raws.length,
      coerced: posts.length,
    });
  }

  db.close();
  console.log(JSON.stringify({ inserted: totalInserted, skipped: totalSkipped, files: files.length }));
}

main();
