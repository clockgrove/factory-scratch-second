// notes.mjs: the notes store. Every function takes a connected client first.
import { loadRules } from "./rules.mjs";

/** Insert a note after every rule in src/rules accepts it; returns the row. */
export async function add(client, { title, body = "", tags = [], embedding = null }) {
  for (const rule of await loadRules()) {
    const problem = rule.check({ title, body, tags });
    if (problem) throw Object.assign(new Error(problem), { code: rule.code });
  }
  const vec = embedding ? `[${embedding.map(Number).join(",")}]` : null;
  const r = await client.query("INSERT INTO notes (title, body, tags, embedding) VALUES ($1, $2, $3, $4) RETURNING *", [title, body, tags, vec]);
  return r.rows[0];
}

/** Notes, newest first, optionally only those carrying `tag`; `limit` caps the count. */
export async function list(client, { tag = null, limit = 100 } = {}) {
  const r = tag
    ? await client.query("SELECT * FROM notes WHERE $1 = ANY(tags) ORDER BY created_at DESC, id DESC LIMIT $2", [tag, limit])
    : await client.query("SELECT * FROM notes ORDER BY created_at DESC, id DESC LIMIT $1", [limit]);
  return r.rows;
}

/** Delete by id; true when a row went. */
export async function remove(client, id) {
  const r = await client.query("DELETE FROM notes WHERE id = $1", [id]);
  return r.rowCount === 1;
}

/** The note with this id, or null when there is none. */
export async function get(client, id) {
  const r = await client.query("SELECT * FROM notes WHERE id = $1", [id]);
  return r.rows[0] ?? null;
}

/** The `k` notes nearest to `embedding` by Euclidean distance, nearest first, with their distance. */
export async function similar(client, embedding, k = 3) {
  const vec = `[${embedding.map(Number).join(",")}]`;
  const r = await client.query("SELECT *, embedding <-> $1 AS distance FROM notes WHERE embedding IS NOT NULL ORDER BY embedding <-> $1 LIMIT $2", [vec, k]);
  return r.rows;
}

/** The `k` notes carrying `tag` with an embedding, nearest to `embedding` first (ties by id), with their distance. */
export async function similarByTag(client, tag, embedding, k = 3) {
  const vec = `[${embedding.map(Number).join(",")}]`;
  const r = await client.query("SELECT *, embedding <-> $2 AS distance FROM notes WHERE $1 = ANY(tags) AND embedding IS NOT NULL ORDER BY embedding <-> $2, id LIMIT $3", [tag, vec, k]);
  return r.rows;
}

/** Every distinct tag carried by at least `min` notes with its note count, most used first, ties by tag in byte order. */
export async function tagCounts(client, { min = 1 } = {}) {
  const r = await client.query(`SELECT tag, COUNT(*)::int AS count FROM (SELECT DISTINCT id, unnest(tags) AS tag FROM notes) t GROUP BY tag HAVING COUNT(*) >= $1::numeric ORDER BY count DESC, tag COLLATE "C"`, [min]);
  return r.rows;
}

/** Notes containing literal text in title or body after Postgres lower-casing, optionally tagged, newest first. */
export async function search(client, { q, tag = null, limit = 20 }) {
  const r = await client.query("SELECT id, title FROM notes WHERE (strpos(lower(title), lower($1)) > 0 OR strpos(lower(body), lower($1)) > 0) AND ($2::text IS NULL OR $2 = ANY(tags)) ORDER BY created_at DESC, id DESC LIMIT $3", [q, tag, limit]);
  return r.rows;
}

/** Notes created at or after midnight UTC on `date`, oldest first, capped by `limit`. */
export async function since(client, { date, limit = 20 }) {
  // ISO year zero is PostgreSQL's 1 BC, since PostgreSQL has no year zero.
  const cutoff = date.startsWith("0000-") ? `0001${date.slice(4)}T00:00:00.000Z BC` : `${date}T00:00:00.000Z`;
  const r = await client.query("SELECT * FROM notes WHERE created_at >= $1::timestamptz ORDER BY created_at ASC, id ASC LIMIT $2", [cutoff, limit]);
  return r.rows;
}
