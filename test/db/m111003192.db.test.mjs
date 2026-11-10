import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m111003192.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111003192"); });
after(async () => { await db.done(); });

test("m111003192 a new note starts at 0", async () => {
  const note = await add(db.client, { title: "fresh" });
  const { rows } = await db.client.query("SELECT m111003192_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m111003192_count, 0);
});

test("m111003192 two bumps give 2", async () => {
  const note = await add(db.client, { title: "bumped" });
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111003192_count=1`);
  assert.equal(await run(db.client, [String(note.id), "ignored"]), `#${note.id} m111003192_count=2`);
});

test("m111003192 an unknown id returns the no-note line", async () => {
  assert.equal(await run(db.client, ["999999"]), "no note #999999");
});

test("m111003192 an id outside int4 returns the no-note line", async () => {
  assert.equal(await run(db.client, ["2147483648"]), "no note #2147483648");
});

test("m111003192 a missing id throws BAD_ID", async () => {
  await assert.rejects(() => run(db.client, []), { code: "BAD_ID" });
});

test("m111003192 1e2 throws BAD_ID", async () => {
  await assert.rejects(() => run(db.client, ["1e2"]), { code: "BAD_ID" });
});
