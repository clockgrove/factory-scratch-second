import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { run } from "../../src/commands/search.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("search"); });
beforeEach(async () => { await db.client.query("DELETE FROM notes"); });
after(async () => { await db.done(); });

test("search matches title and body ignoring case", async () => {
  const title = await add(db.client, { title: "MiXeD title" });
  const body = await add(db.client, { title: "body result", body: "a MIXED body" });
  await add(db.client, { title: "unrelated" });
  await db.client.query("UPDATE notes SET created_at = '2026-01-01' WHERE id = ANY($1)", [[title.id, body.id]]);
  assert.equal(await run(db.client, ["--q", "mixed"]), `#${body.id} body result\n#${title.id} MiXeD title`);
});

test("search treats percent as a literal substring", async () => {
  const note = await add(db.client, { title: "50% off" });
  await add(db.client, { title: "500 off" });
  assert.equal(await run(db.client, ["--q", "50%"]), `#${note.id} 50% off`);
});

test("search treats underscore as a literal substring", async () => {
  const note = await add(db.client, { title: "a_b" });
  await add(db.client, { title: "axb" });
  assert.equal(await run(db.client, ["--q", "a_b"]), `#${note.id} a_b`);
});

test("search treats backslash literally in the body", async () => {
  const note = await add(db.client, { title: "path", body: "a\\b" });
  await add(db.client, { title: "other path", body: "ab" });
  assert.equal(await run(db.client, ["--q", "a\\b"]), `#${note.id} path`);
});

test("--tag keeps only exact case-sensitive tags", async () => {
  const note = await add(db.client, { title: "match exact", tags: ["T"] });
  await add(db.client, { title: "match lowercase", tags: ["t"] });
  await add(db.client, { title: "match untagged" });
  await add(db.client, { title: "unrelated", tags: ["T"] });
  assert.equal(await run(db.client, ["--q", "match", "--tag", "T"]), `#${note.id} match exact`);
});

test("an empty tag filters for an exact empty tag", async () => {
  const note = await add(db.client, { title: "match empty", tags: [""] });
  await add(db.client, { title: "match untagged" });
  assert.equal(await run(db.client, ["--q", "match", "--tag", ""]), `#${note.id} match empty`);
});

test("search orders by created_at descending then id descending before limiting", async () => {
  const newest = await add(db.client, { title: "match newest" });
  const older = await add(db.client, { title: "match older" });
  const tie = await add(db.client, { title: "match tie" });
  await db.client.query("UPDATE notes SET created_at = '2026-01-01'");
  await db.client.query("UPDATE notes SET created_at = '2026-01-02' WHERE id = $1", [newest.id]);
  assert.equal(await run(db.client, ["--q", "match"]), `#${newest.id} match newest\n#${tie.id} match tie\n#${older.id} match older`);
  assert.equal(await run(db.client, ["--q", "match", "--limit", "2"]), `#${newest.id} match newest\n#${tie.id} match tie`);
});

test("search defaults to twenty results and accepts decimal limit boundaries", async () => {
  const notes = [];
  for (let i = 0; i < 21; i++) notes.push(await add(db.client, { title: `match ${i}` }));
  await db.client.query("UPDATE notes SET created_at = '2026-01-01'");
  const lines = notes.reverse().map((note) => `#${note.id} ${note.title}`);
  assert.equal(await run(db.client, ["--q", "match"]), lines.slice(0, 20).join("\n"));
  assert.equal(await run(db.client, ["--q", "match", "--limit", "01"]), lines[0]);
  assert.equal(await run(db.client, ["--q", "match", "--limit", "2147483647"]), lines.join("\n"));
});

test("search finds matches beyond the store list cap", async () => {
  const note = await add(db.client, { title: "needle" });
  for (let i = 0; i < 101; i++) await add(db.client, { title: `unrelated ${i}` });
  await db.client.query("UPDATE notes SET created_at = '2025-01-01' WHERE id = $1", [note.id]);
  assert.equal(await run(db.client, ["--q", "needle"]), `#${note.id} needle`);
});

test("search prints an empty string when no note matches", async () => {
  await add(db.client, { title: "unrelated", body: "other" });
  assert.equal(await run(db.client, ["--q", "missing"]), "");
});
