// P6: posts without embeddings → OpenAI text-embedding-3-small → posts_vec.
// `bun run src/phases/embed.ts` for standalone CLI.

import { openDb, toVecBlob } from "../lib/db.ts";
import { getRunId, logEvent } from "../lib/log.ts";
import { addCost, assertBudget } from "../lib/budget.ts";

const EMBED_MODEL = "text-embedding-3-small";
const EMBED_DIM = 256;
const BATCH_SIZE = 100;
const USD_PER_TOKEN = 0.02 / 1_000_000;

interface EmbedApiResponse {
  data: { index: number; embedding: number[] }[];
  usage: { total_tokens: number };
}

export type EmbedFetcher = (
  texts: string[],
) => Promise<{ embeddings: number[][]; totalTokens: number }>;

export const openaiEmbedFetcher: EmbedFetcher = async (texts) => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not set");
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: texts,
      dimensions: EMBED_DIM,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as EmbedApiResponse;
  const sorted = json.data.sort((a, b) => a.index - b.index);
  return {
    embeddings: sorted.map((d) => d.embedding),
    totalTokens: json.usage.total_tokens,
  };
};

export async function runEmbed(
  fetcher: EmbedFetcher = openaiEmbedFetcher,
): Promise<{ embedded: number; cost: number }> {
  const db = openDb();
  const runId = getRunId();
  logEvent(runId, "embed", "info", "P6 start");

  const rows = db
    .query<{ id: number; text: string; title: string | null }, []>(
      `SELECT p.id, p.text, p.title FROM posts p
       LEFT JOIN posts_vec pv ON pv.post_id = p.id
       WHERE pv.post_id IS NULL ORDER BY p.id`,
    )
    .all();

  if (rows.length === 0) {
    logEvent(runId, "embed", "info", "no pending posts");
    db.close();
    return { embedded: 0, cost: 0 };
  }

  let totalEmbedded = 0;
  let totalCostUsd = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const texts = batch.map(
      (r) => `${r.title ?? ""} ${r.text}`.trim().slice(0, 8000),
    );

    const estTokens = texts.reduce(
      (s, t) => s + Math.ceil(t.length / 4),
      0,
    );
    const estCost = estTokens * USD_PER_TOKEN;
    const status = assertBudget(estCost, db);
    if (status === "skip-embed") {
      logEvent(runId, "embed", "warn", `budget skip-embed at batch ${i}`);
      break;
    }

    const { embeddings, totalTokens } = await fetcher(texts);
    const actualCost = totalTokens * USD_PER_TOKEN;

    const stmt = db.prepare(
      "INSERT INTO posts_vec(post_id, embedding) VALUES (?, ?)",
    );
    try {
      const tx = db.transaction(() => {
        for (let j = 0; j < batch.length; j++) {
          const row = batch[j];
          const emb = embeddings[j];
          if (!row || !emb) continue;
          stmt.run(row.id, toVecBlob(new Float32Array(emb)));
        }
      });
      tx();
    } finally {
      stmt.finalize();
    }

    totalCostUsd += actualCost;
    totalEmbedded += batch.length;
    addCost(runId, "embed", actualCost, db);
  }

  logEvent(runId, "embed", "info", `P6 done: ${totalEmbedded} embedded`, {
    cost: totalCostUsd,
  });
  db.close();
  return { embedded: totalEmbedded, cost: totalCostUsd };
}

if (import.meta.main) {
  const r = await runEmbed();
  console.log(JSON.stringify(r, null, 2));
}
