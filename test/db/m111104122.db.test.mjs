import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m111104122.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
let note;
before(async () => {
  db = await freshClient("m111104122");
  note = await add(db.client, { title: "counted", body: "", tags: [] });
});
after(async () => { await db.done(); });

test("a new note starts at 0", async () => {
  const { rows } = await db.client.query("SELECT m111104122_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m111104122_count, 0);
});

test("two bumps give 2", async () => {
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111104122_count=1`);
  assert.equal(await run(db.client, [String(note.id), "ignored"]), `#${note.id} m111104122_count=2`);
});

test("an unknown id gives the no-note line", async () => {
  assert.equal(await run(db.client, ["999999"]), "no note #999999");
});

test("an id outside int4 gives the no-note line", async () => {
  assert.equal(await run(db.client, ["2147483648"]), "no note #2147483648");
});

test("a missing id throws BAD_ID", async () => {
  await assert.rejects(run(db.client, []), { code: "BAD_ID" });
});

test("1e2 throws BAD_ID", async () => {
  await assert.rejects(run(db.client, ["1e2"]), { code: "BAD_ID" });
});
