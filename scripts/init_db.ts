import { Database } from "bun:sqlite";
import * as sqliteVec from "sqlite-vec";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

function pickCustomSqlite(): string | undefined {
  if (process.env.CUSTOM_SQLITE) return process.env.CUSTOM_SQLITE;
  if (process.platform !== "darwin") return undefined;
  const candidates = [
    "/opt/homebrew/opt/sqlite/lib/libsqlite3.dylib",
    "/usr/local/opt/sqlite/lib/libsqlite3.dylib",
  ];
  return candidates.find(existsSync);
}

const CUSTOM_SQLITE = pickCustomSqlite();
if (CUSTOM_SQLITE) Database.setCustomSQLite(CUSTOM_SQLITE);

const PROJECT_ROOT = resolve(import.meta.dir, "..");
const SCHEMA_PATH = resolve(PROJECT_ROOT, "db/schema.sql");
const DB_PATH =
  process.env.DB_PATH ?? resolve(PROJECT_ROOT, "db/app.db");

mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.loadExtension(sqliteVec.getLoadablePath());

const schema = readFileSync(SCHEMA_PATH, "utf8");
db.exec(schema);

console.log(`✓ schema applied → ${DB_PATH}`);
console.log("STEP1_INIT_OK");
db.close();
