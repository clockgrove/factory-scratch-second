import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m110608362.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110608362"); });
after(async () => { await db.done(); });

test("a new note starts at 0", async () => {
  const note = await add(db.client, { title: "fresh" });
  const { rows } = await db.client.query("SELECT m110608362_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m110608362_count, 0);
});

test("two bumps give 2", async () => {
  const note = await add(db.client, { title: "bumped" });
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110608362_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110608362_count=2`);
});

test("an unknown id gives the no-note line", async () => {
  assert.equal(await run(db.client, ["999999"]), "no note #999999");
});

test("a missing or non-integer id is BAD_ID", async () => {
  await assert.rejects(run(db.client, []), { code: "BAD_ID" });
  await assert.rejects(run(db.client, ["abc"]), { code: "BAD_ID" });
  await assert.rejects(run(db.client, ["1.5"]), { code: "BAD_ID" });
  await assert.rejects(run(db.client, [""]), { code: "BAD_ID" });
});

test("an integer id outside the int4 range gives the no-note line", async () => {
  assert.equal(await run(db.client, ["3000000000"]), "no note #3000000000");
  assert.equal(await run(db.client, ["9007199254740993"]), "no note #9007199254740993");
});

test("an id written as 1.0 is read the way notes remove reads it", async () => {
  const note = await add(db.client, { title: "spelled" });
  assert.equal(await run(db.client, [`${note.id}.0`]), `#${note.id} m110608362_count=1`);
});
