import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m111103342.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111103342"); });
after(async () => { await db.done(); });

test("a new note starts at zero and two bumps give two", async () => {
  const note = await add(db.client, { title: "counter" });
  assert.equal(note.m111103342_count, 0);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111103342_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111103342_count=2`);
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
