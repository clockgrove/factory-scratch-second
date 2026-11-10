import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m110911062.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110911062"); });
after(async () => { await db.done(); });

async function count(id) {
  return (await db.client.query("SELECT m110911062_count AS c FROM notes WHERE id = $1", [id])).rows[0].c;
}

test("a new note starts at 0 and two bumps give 2", async () => {
  const note = await add(db.client, { title: "a" });
  assert.equal(await count(note.id), 0);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110911062_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110911062_count=2`);
});

test("an unknown id returns the no-note line", async () => {
  assert.equal(await run(db.client, ["999999"]), "no note #999999");
});

test("an id outside int4 returns the no-note line", async () => {
  assert.equal(await run(db.client, ["2147483648"]), "no note #2147483648");
});

test("a missing id throws BAD_ID", async () => {
  await assert.rejects(run(db.client, []), { code: "BAD_ID" });
});

test("1e2 throws BAD_ID", async () => {
  await assert.rejects(run(db.client, ["1e2"]), { code: "BAD_ID" });
});
