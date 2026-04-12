import { Database } from "bun:sqlite";
import * as sqliteVec from "sqlite-vec";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

// macOS system libsqlite3 is built without load_extension. Swap to Homebrew's
// build before opening any DB. Linux distros ship load_extension enabled.
function pickCustomSqlite(): string | undefined {
  if (process.env.CUSTOM_SQLITE) return process.env.CUSTOM_SQLITE;
  if (process.platform !== "darwin") return undefined;
  const candidates = [
    "/opt/homebrew/opt/sqlite/lib/libsqlite3.dylib", // arm64 Homebrew
    "/usr/local/opt/sqlite/lib/libsqlite3.dylib", // Intel Homebrew
  ];
  return candidates.find(existsSync);
}

const CUSTOM_SQLITE = pickCustomSqlite();
if (CUSTOM_SQLITE) Database.setCustomSQLite(CUSTOM_SQLITE);

const PROJECT_ROOT = resolve(import.meta.dir, "..");
const DB_PATH = resolve(PROJECT_ROOT, "db/verify.db");
mkdirSync(resolve(PROJECT_ROOT, "db"), { recursive: true });
try {
  rmSync(DB_PATH);
} catch {
  /* first run */
}

const db = new Database(DB_PATH);

try {
  db.loadExtension(sqliteVec.getLoadablePath());
} catch (err) {
  console.error("✗ failed to load sqlite-vec extension");
  console.error("  getLoadablePath:", sqliteVec.getLoadablePath());
  console.error("  CUSTOM_SQLITE:", CUSTOM_SQLITE ?? "(not set)");
  console.error(
    "  hint: bun >= 1.1.13 required; on macOS install sqlite via Homebrew or set CUSTOM_SQLITE=/path/to/libsqlite3.dylib",
  );
  console.error(err);
  process.exit(1);
}

const version = db
  .query<{ v: string }, []>("SELECT vec_version() AS v")
  .get()!.v;
console.log(`✓ sqlite-vec loaded (${version})`);

db.run(
  `CREATE VIRTUAL TABLE _verify USING vec0(
    id INTEGER PRIMARY KEY,
    embedding float[256]
  )`,
);

const DIM = 256;
const vec = new Float32Array(DIM);
for (let i = 0; i < DIM; i++) vec[i] = Math.sin(i * 0.017) * 0.5;
const blob = new Uint8Array(vec.buffer, vec.byteOffset, vec.byteLength);

db.query("INSERT INTO _verify(id, embedding) VALUES (?, ?)").run(42, blob);

const row = db
  .query<{ id: number; distance: number }, [Uint8Array]>(
    `SELECT id, distance FROM _verify
     WHERE embedding MATCH ? AND k = 1
     ORDER BY distance`,
  )
  .get(blob);

if (!row || row.id !== 42 || row.distance !== 0) {
  console.error("✗ round-trip FAILED", row);
  process.exit(1);
}
console.log(`✓ round-trip OK (id=${row.id}, distance=${row.distance})`);
console.log("STEP1_VERIFY_PASS");

db.close();
rmSync(DB_PATH);
