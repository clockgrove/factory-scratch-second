import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m110609032.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110609032"); });
after(async () => { await db.done(); });

test("a new note starts at 0", async () => {
  const note = await add(db.client, { title: "fresh" });
  const { rows } = await db.client.query("SELECT m110609032_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m110609032_count, 0);
});

test("two bumps give 2", async () => {
  const note = await add(db.client, { title: "bumped" });
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110609032_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110609032_count=2`);
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

test("an id in a non-decimal or non-integer spelling is BAD_ID", async () => {
  for (const raw of ["0x10", "1e1", "0b11", "+3", "3.0", " 3"]) {
    await assert.rejects(run(db.client, [raw]), { code: "BAD_ID" }, raw);
  }
});

test("an id after -- is read as the positional id", async () => {
  const note = await add(db.client, { title: "dashed" });
  assert.equal(await run(db.client, ["--", String(note.id)]), `#${note.id} m110609032_count=1`);
});
