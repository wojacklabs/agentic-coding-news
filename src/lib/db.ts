import { Database } from "bun:sqlite";
import * as sqliteVec from "sqlite-vec";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
/* existsSync is still used inside pickCustomSqlite() below */

const PROJECT_ROOT = resolve(import.meta.dir, "..", "..");
const SCHEMA_PATH = resolve(PROJECT_ROOT, "db/schema.sql");
function getDefaultDbPath(): string {
  return process.env.DB_PATH ?? resolve(PROJECT_ROOT, "db/app.db");
}

function pickCustomSqlite(): string | undefined {
  if (process.env.CUSTOM_SQLITE) return process.env.CUSTOM_SQLITE;
  if (process.platform !== "darwin") return undefined;
  return [
    "/opt/homebrew/opt/sqlite/lib/libsqlite3.dylib", // arm64 Homebrew
    "/usr/local/opt/sqlite/lib/libsqlite3.dylib", // Intel Homebrew
  ].find(existsSync);
}

let customSqliteApplied = false;
function ensureCustomSqlite(): void {
  if (customSqliteApplied) return;
  const lib = pickCustomSqlite();
  if (lib) Database.setCustomSQLite(lib);
  customSqliteApplied = true;
}

/**
 * Open a SQLite database with sqlite-vec loaded and connection-scoped
 * PRAGMAs re-applied. The schema is re-executed unconditionally every
 * open — db/schema.sql uses `CREATE ... IF NOT EXISTS` throughout, so
 * running it is idempotent and we avoid the "empty file left behind"
 * failure mode where an existsSync-based gate skips the bootstrap.
 */
export function openDb(path?: string): Database {
  const dbPath = path ?? getDefaultDbPath();
  ensureCustomSqlite();
  mkdirSync(dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  db.loadExtension(sqliteVec.getLoadablePath());
  // connection-scoped PRAGMAs — must be re-applied on every open
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA busy_timeout = 5000;");
  db.exec(readFileSync(SCHEMA_PATH, "utf8"));
  return db;
}

/**
 * Wrap a Float32Array view as a BLOB-compatible Uint8Array, preserving
 * byteOffset/byteLength so slices bind correctly.
 */
export function toVecBlob(vec: Float32Array): Uint8Array {
  return new Uint8Array(vec.buffer, vec.byteOffset, vec.byteLength);
}

/**
 * Decode a vec0 BLOB back into a Float32Array. The input may be an
 * unaligned slice, so we copy into a fresh buffer before reinterpreting.
 */
export function fromVecBlob(blob: Uint8Array, dim: number): Float32Array {
  if (blob.byteLength !== dim * 4) {
    throw new Error(
      `fromVecBlob: expected ${dim * 4} bytes, got ${blob.byteLength}`,
    );
  }
  const copy = new Uint8Array(blob.byteLength);
  copy.set(blob);
  return new Float32Array(copy.buffer);
}
