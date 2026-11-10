import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m111002212.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111002212"); });
after(async () => { await db.done(); });

test("a new note starts at zero and two bumps give two", async () => {
  const note = await add(db.client, { title: "counter" });
  const { rows } = await db.client.query("SELECT m111002212_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m111002212_count, 0);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111002212_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111002212_count=2`);
});

test("an unknown id returns the no-note line", async () => {
  assert.equal(await run(db.client, ["2147483647"]), "no note #2147483647");
});

test("an id outside int4 returns the no-note line without a query", async () => {
  const client = { query() { assert.fail("out-of-range ids must not query"); } };
  assert.equal(await run(client, ["2147483648"]), "no note #2147483648");
});

test("a missing id fails with BAD_ID", async () => {
  await assert.rejects(run(db.client, []), { code: "BAD_ID" });
});

test("a malformed id fails with BAD_ID", async () => {
  await assert.rejects(run(db.client, ["1e2"]), { code: "BAD_ID" });
});
