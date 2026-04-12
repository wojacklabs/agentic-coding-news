// P7: posts_vec KNN against articles_vec — cosine dedupe.
// Normalised vectors stored in vec0 → L2 distance ≈ √(2 - 2·cos_sim).
// Threshold: L2 < 0.4 ≈ cosine similarity > 0.92 → duplicate.
// `bun run src/phases/dedupe.ts` for standalone CLI.

import { openDb } from "../lib/db.ts";
import { getRunId, logEvent } from "../lib/log.ts";

const L2_DUPE_THRESHOLD = 0.4; // ≈ cosine > 0.92

interface Candidate {
  post_id: number;
  source: string;
  title: string | null;
  text: string;
  url: string;
  score: number;
  posted_at: number;
}

export function runDedupe(): {
  candidates: Candidate[];
  dropped: number;
} {
  const db = openDb();
  const runId = getRunId();
  logEvent(runId, "dedupe", "info", "P7 start");

  const artCount =
    db
      .query<{ c: number }, []>(
        "SELECT COUNT(*) AS c FROM articles_vec",
      )
      .get()?.c ?? 0;

  // All posts that have embeddings, scored highest first
  const rows = db
    .query<Candidate, []>(
      `SELECT p.id AS post_id, p.source, p.title, p.text, p.url,
              p.score, p.posted_at
       FROM posts p
       JOIN posts_vec pv ON pv.post_id = p.id
       ORDER BY p.score DESC, p.posted_at DESC`,
    )
    .all();

  // Cold start: no articles yet → all pass
  if (artCount === 0) {
    logEvent(runId, "dedupe", "info", `cold start: all ${rows.length} pass`);
    db.close();
    return { candidates: rows, dropped: 0 };
  }

  const candidates: Candidate[] = [];
  let dropped = 0;

  for (const row of rows) {
    const vecRow = db
      .query<{ embedding: Uint8Array }, [number]>(
        "SELECT embedding FROM posts_vec WHERE post_id = ?",
      )
      .get(row.post_id);
    if (!vecRow) continue;

    const nearest = db
      .query<{ distance: number }, [Uint8Array]>(
        `SELECT distance FROM articles_vec
         WHERE embedding MATCH ? AND k = 1
         ORDER BY distance`,
      )
      .get(vecRow.embedding);

    if (nearest && nearest.distance < L2_DUPE_THRESHOLD) {
      dropped++;
    } else {
      candidates.push(row);
    }
  }

  logEvent(runId, "dedupe", "info", `P7 done: ${candidates.length} pass, ${dropped} dupes`);
  db.close();
  return { candidates, dropped };
}

if (import.meta.main) {
  const r = runDedupe();
  console.log(JSON.stringify(r, null, 2));
}
