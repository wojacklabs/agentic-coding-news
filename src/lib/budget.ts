import type { Database } from "bun:sqlite";

export const BUDGET_SOFT_USD = 2.5;
export const BUDGET_EMBED_SKIP_USD = 2.8;
export const BUDGET_HARD_USD = 3.0;

export class BudgetExceededError extends Error {
  constructor(
    public readonly todayTotal: number,
    public readonly attempted: number,
    public readonly limit: number,
  ) {
    super(
      `budget exceeded: today=$${todayTotal.toFixed(4)} + $${attempted.toFixed(4)} > $${limit.toFixed(2)}`,
    );
    this.name = "BudgetExceededError";
  }
}

/**
 * Return [startUnixSec, endUnixSec) for today in Asia/Seoul.
 * KST has no DST, so a fixed +9h offset is safe.
 */
export function kstDayBoundsUnix(now: Date = new Date()): [number, number] {
  const KST_OFFSET_MS = 9 * 3_600_000;
  const kstMs = now.getTime() + KST_OFFSET_MS;
  const kstMidnightMs = Math.floor(kstMs / 86_400_000) * 86_400_000;
  const startUtcSec = Math.floor((kstMidnightMs - KST_OFFSET_MS) / 1000);
  return [startUtcSec, startUtcSec + 86_400];
}

/** Sum of all `cost.*` metrics written today (KST). */
export function getTodayTotal(db: Database): number {
  const [from, to] = kstDayBoundsUnix();
  const row = db
    .query<{ s: number | null }, [number, number]>(
      `SELECT COALESCE(SUM(value), 0) AS s FROM metrics
       WHERE key LIKE 'cost.%' AND created_at >= ? AND created_at < ?`,
    )
    .get(from, to);
  return row?.s ?? 0;
}

/**
 * Check whether `additionalUsd` can still be spent today.
 *
 *  - Throws `BudgetExceededError` only at the HARD limit ($3.00).
 *  - Returns `"skip-embed"` in the [2.80, 3.00) range — caller should skip
 *    the embedding call but may keep running cheaper phases.
 *  - Returns `"warn"` in the [2.50, 2.80) range — still OK, just log.
 *  - Returns `"ok"` below 2.50.
 */
export function assertBudget(
  additionalUsd: number,
  db: Database,
): "ok" | "warn" | "skip-embed" {
  if (!Number.isFinite(additionalUsd) || additionalUsd < 0) {
    throw new Error(`invalid additionalUsd: ${additionalUsd}`);
  }
  const today = getTodayTotal(db);
  const projected = today + additionalUsd;
  if (projected >= BUDGET_HARD_USD) {
    throw new BudgetExceededError(today, additionalUsd, BUDGET_HARD_USD);
  }
  if (projected >= BUDGET_EMBED_SKIP_USD) return "skip-embed";
  if (projected >= BUDGET_SOFT_USD) return "warn";
  return "ok";
}

/** Record a cost row in `metrics`. Returns the updated daily total. */
export function addCost(
  runId: string,
  phase: string,
  usd: number,
  db: Database,
): number {
  if (!Number.isFinite(usd) || usd < 0) {
    throw new Error(`invalid cost: ${usd}`);
  }
  const now = Math.floor(Date.now() / 1000);
  db.query(
    `INSERT INTO metrics(run_id, phase, key, value, note, created_at)
     VALUES (?, ?, ?, ?, NULL, ?)`,
  ).run(runId, phase, `cost.${phase}`, usd, now);
  return getTodayTotal(db);
}
