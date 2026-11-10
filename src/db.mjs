// db.mjs: one pg client, and migrations applied in file order from migrations/*.sql.
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const MIGRATIONS = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");

/** A connected client for DATABASE_URL (or `url`); the caller ends it. */
export async function connect(url = process.env.DATABASE_URL) {
  if (!url) throw new Error("DATABASE_URL is not set");
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  return client;
}

/** Apply every migrations/*.sql not yet recorded in schema_migrations, in lexical order; returns the names applied. */
export async function migrate(client) {
  await client.query("CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())");
  const done = new Set((await client.query("SELECT name FROM schema_migrations")).rows.map((r) => r.name));
  const applied = [];
  for (const name of readdirSync(MIGRATIONS).filter((f) => f.endsWith(".sql")).sort()) {
    if (done.has(name)) continue;
    await client.query("BEGIN");
    try {
      await client.query(readFileSync(join(MIGRATIONS, name), "utf8"));
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [name]);
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    }
    applied.push(name);
  }
  return applied;
}
