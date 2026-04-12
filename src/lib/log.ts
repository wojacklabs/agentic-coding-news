import { appendFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const PROJECT_ROOT = resolve(import.meta.dir, "..", "..");
const LOG_DIR = resolve(PROJECT_ROOT, "logs");
const KST_OFFSET_MS = 9 * 3_600_000;

export type LogLevel = "info" | "warn" | "error";

interface KstParts {
  iso: string; // 2026-04-11T14:23:05.123+09:00
  ymd: string; // 2026-04-11
}

function kstNow(): KstParts {
  const shifted = new Date(Date.now() + KST_OFFSET_MS);
  const yyyy = shifted.getUTCFullYear();
  const mm = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(shifted.getUTCDate()).padStart(2, "0");
  const hh = String(shifted.getUTCHours()).padStart(2, "0");
  const mi = String(shifted.getUTCMinutes()).padStart(2, "0");
  const ss = String(shifted.getUTCSeconds()).padStart(2, "0");
  const ms = String(shifted.getUTCMilliseconds()).padStart(3, "0");
  const ymd = `${yyyy}-${mm}-${dd}`;
  const iso = `${ymd}T${hh}:${mi}:${ss}.${ms}+09:00`;
  return { iso, ymd };
}

let cachedRunId: string | null = null;

/**
 * Stable run identifier for the current process. Cached after first call
 * so every phase in the same tick shares one id.
 */
export function getRunId(): string {
  if (cachedRunId) return cachedRunId;
  const { iso } = kstNow();
  // 2026-04-11T14:23:05.123+09:00 -> 2026-04-11T14-23-05
  cachedRunId = iso.replace(/:/g, "-").slice(0, 19);
  return cachedRunId;
}

export function logEvent(
  runId: string,
  phase: string,
  level: LogLevel,
  msg: string,
  extra?: Record<string, unknown>,
): void {
  mkdirSync(LOG_DIR, { recursive: true });
  const { iso, ymd } = kstNow();
  const record: Record<string, unknown> = {
    run_id: runId,
    ts: iso,
    phase,
    level,
    msg,
  };
  if (extra) record["extra"] = extra;
  const path = resolve(LOG_DIR, `run-${ymd}.jsonl`);
  appendFileSync(path, JSON.stringify(record) + "\n", "utf8");
  if (level === "warn") console.warn(`[warn] ${phase}: ${msg}`);
  else if (level === "error") console.error(`[error] ${phase}: ${msg}`);
}
