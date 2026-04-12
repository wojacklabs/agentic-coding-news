// P10: git commit/push + articles_vec (avg of source post vectors).
// `bun run src/phases/publish.ts <articleId> <mdPath>`

import { openDb, toVecBlob } from "../lib/db.ts";
import { getRunId, logEvent } from "../lib/log.ts";

const DIM = 256;

export interface PublishOpts {
  articleId: number;
  mdPath: string;
  title: string;
  dryRun?: boolean;
}

export async function runPublish(opts: PublishOpts): Promise<{ pushed: boolean }> {
  const db = openDb();
  const runId = getRunId();
  logEvent(runId, "publish", "info", `P10 start: article#${opts.articleId}`);

  // --- articles_vec: average of related post vectors, L2 normalised ---
  const postVecs = db
    .query<{ embedding: Uint8Array }, [number]>(
      `SELECT pv.embedding FROM posts_vec pv
       JOIN posts p ON pv.post_id = p.id
       WHERE p.fetched_at >= (SELECT created_at FROM articles WHERE id = ?)
       ORDER BY p.score DESC LIMIT 20`,
    )
    .all(opts.articleId);

  if (postVecs.length > 0) {
    const avg = new Float32Array(DIM);
    for (const row of postVecs) {
      const buf = new Uint8Array(row.embedding);
      const copy = new Uint8Array(buf.byteLength);
      copy.set(buf);
      const v = new Float32Array(copy.buffer);
      for (let i = 0; i < DIM; i++) avg[i]! += v[i]! / postVecs.length;
    }
    // L2 normalise so dedupe thresholds remain valid
    let norm = 0;
    for (let i = 0; i < DIM; i++) norm += avg[i]! * avg[i]!;
    norm = Math.sqrt(norm);
    if (norm > 0) {
      for (let i = 0; i < DIM; i++) avg[i]! /= norm;
    }
    db.prepare(
      "INSERT OR REPLACE INTO articles_vec(article_id, embedding) VALUES (?, ?)",
    ).run(opts.articleId, toVecBlob(avg));
  }

  // --- articles status → published ---
  db.query(
    "UPDATE articles SET status = 'published', published_at = ? WHERE id = ?",
  ).run(Math.floor(Date.now() / 1000), opts.articleId);

  // --- git commit + push ---
  let pushed = false;
  if (!opts.dryRun) {
    try {
      const cwd = import.meta.dir + "/../..";
      const add = Bun.spawn(["git", "add", "posts/"], { cwd });
      await add.exited;
      const diff = Bun.spawn(["git", "diff", "--cached", "--quiet"], { cwd });
      const hasDiff = (await diff.exited) !== 0;
      if (hasDiff) {
        const commit = Bun.spawn(
          ["git", "commit", "-m", `daily: ${opts.title.slice(0, 50)}`],
          { cwd },
        );
        await commit.exited;
        const push = Bun.spawn(["git", "push"], { cwd });
        await push.exited;
        pushed = true;
      }
    } catch (e) {
      logEvent(runId, "publish", "warn", `git failed: ${e}`);
    }
  }

  logEvent(runId, "publish", "info", `P10 done`, { pushed });
  db.close();
  return { pushed };
}

if (import.meta.main) {
  const [id, path, title] = process.argv.slice(2);
  if (!id || !path)
    throw new Error("usage: publish.ts <articleId> <mdPath> [title]");
  const r = await runPublish({
    articleId: Number(id),
    mdPath: path,
    title: title ?? "daily",
  });
  console.log(JSON.stringify(r));
}
