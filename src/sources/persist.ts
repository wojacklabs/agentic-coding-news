import type { Database } from "bun:sqlite";
import type { Post } from "../lib/types.ts";

export interface InsertResult {
  inserted: number;
  skipped: number;
}

const INSERT_SQL = `
INSERT OR IGNORE INTO posts
  (source, source_id, url, author, title, text, lang, posted_at, fetched_at, score)
VALUES
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

/** Bulk upsert posts. UNIQUE(source, source_id) collisions count as `skipped`. */
export function insertPosts(db: Database, posts: Post[]): InsertResult {
  if (posts.length === 0) return { inserted: 0, skipped: 0 };
  const stmt = db.prepare(INSERT_SQL);
  let inserted = 0;
  try {
    const tx = db.transaction((batch: Post[]) => {
      for (const p of batch) {
        const r = stmt.run(
          p.source,
          p.source_id,
          p.url,
          p.author,
          p.title,
          p.text,
          p.lang,
          p.posted_at,
          p.fetched_at,
          p.score,
        );
        if (r.changes > 0) inserted += 1;
      }
    });
    tx(posts);
  } finally {
    stmt.finalize();
  }
  return { inserted, skipped: posts.length - inserted };
}
