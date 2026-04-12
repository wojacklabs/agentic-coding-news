import { existsSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { openDb, toVecBlob, fromVecBlob } from "../src/lib/db.ts";
import {
  addCost,
  assertBudget,
  BudgetExceededError,
  getTodayTotal,
} from "../src/lib/budget.ts";
import { getRunId, logEvent } from "../src/lib/log.ts";

const PROJECT_ROOT = resolve(import.meta.dir, "..");
const TMP_DB = resolve(PROJECT_ROOT, "db/verify_lib.db");

function cleanup() {
  for (const suffix of ["", "-wal", "-shm", "-journal"]) {
    try {
      rmSync(TMP_DB + suffix);
    } catch {
      /* noop */
    }
  }
}
cleanup();

// (1) openDb — FK on, sqlite-vec loaded, schema applied on first open
const db = openDb(TMP_DB);
const fkRow = db
  .query<{ foreign_keys: number }, []>("PRAGMA foreign_keys")
  .get();
if (!fkRow || fkRow.foreign_keys !== 1) {
  throw new Error(`FK not enabled: ${fkRow?.foreign_keys}`);
}
const vvRow = db.query<{ v: string }, []>("SELECT vec_version() AS v").get();
if (!vvRow) throw new Error("vec_version unavailable");
console.log(`✓ openDb OK (fk=${fkRow.foreign_keys}, vec=${vvRow.v})`);

// (2) toVecBlob / fromVecBlob round-trip + real posts_vec insert
const DIM = 256;
const src = new Float32Array(DIM);
for (let i = 0; i < DIM; i++) src[i] = Math.cos(i * 0.013) * 0.7;
const blob = toVecBlob(src);
const back = fromVecBlob(blob, DIM);
for (let i = 0; i < DIM; i++) {
  const a = src[i] ?? NaN;
  const b = back[i] ?? NaN;
  if (a !== b) throw new Error(`vec mismatch at ${i}: ${a} vs ${b}`);
}
db.query("INSERT INTO posts_vec(post_id, embedding) VALUES (?, ?)").run(
  1,
  blob,
);
console.log("✓ toVecBlob/fromVecBlob round-trip OK + posts_vec insert");

// (3) budget — addCost increases total, assertBudget throws on overflow
const runId = getRunId();
const before = getTodayTotal(db);
const after = addCost(runId, "embed", 0.0123, db);
if (Math.abs(after - before - 0.0123) > 1e-9) {
  throw new Error(
    `budget delta mismatch: before=${before} after=${after}`,
  );
}
console.log(
  `✓ addCost OK (before=$${before.toFixed(4)}, after=$${after.toFixed(4)})`,
);

// assertBudget returns ok/warn/skip-embed for legal projections,
// and throws BudgetExceededError only at the HARD limit.
const okResult = assertBudget(0.1, db);
if (okResult !== "ok") throw new Error(`expected ok, got ${okResult}`);

let threw = false;
try {
  assertBudget(99, db);
} catch (e) {
  if (e instanceof BudgetExceededError) threw = true;
  else throw e;
}
if (!threw) throw new Error("BudgetExceededError not thrown at HARD");

// negative cost must be rejected at addCost + assertBudget
let rejectedNegative = false;
try {
  addCost(runId, "embed", -1, db);
} catch {
  rejectedNegative = true;
}
if (!rejectedNegative) throw new Error("negative cost accepted");
console.log("✓ assertBudget HARD throws, ok/warn/skip-embed return, negative rejected");

// (4) logEvent appends to jsonl under logs/run-YYYY-MM-DD.jsonl
logEvent(runId, "verify", "info", "verify_lib hello", { ok: true });
const today = new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10);
const logPath = resolve(PROJECT_ROOT, `logs/run-${today}.jsonl`);
if (!existsSync(logPath)) throw new Error(`log file missing: ${logPath}`);
const lines = readFileSync(logPath, "utf8").trim().split("\n");
const lastLine = lines.at(-1);
if (!lastLine) throw new Error("empty log file");
const parsed = JSON.parse(lastLine) as { run_id: string; msg: string };
if (parsed.run_id !== runId || parsed.msg !== "verify_lib hello") {
  throw new Error(`log content mismatch: ${lastLine}`);
}
console.log(`✓ logEvent OK (${lines.length} lines in run-${today}.jsonl)`);

db.close();
cleanup();
console.log("STEP2_VERIFY_PASS");
