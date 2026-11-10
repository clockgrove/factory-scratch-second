import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m110609332.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110609332"); });
after(async () => { await db.done(); });

test("a new note starts at 0", async () => {
  const note = await add(db.client, { title: "fresh" });
  const { rows } = await db.client.query("SELECT m110609332_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m110609332_count, 0);
});

test("two bumps give 2", async () => {
  const note = await add(db.client, { title: "bumped" });
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110609332_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110609332_count=2`);
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
});

test("an id spelled as remove reads it bumps that note", async () => {
  const note = await add(db.client, { title: "spelled" });
  assert.equal(await run(db.client, [`${note.id}.0`]), `#${note.id} m110609332_count=1`);
  assert.equal(await run(db.client, [`+${note.id}`]), `#${note.id} m110609332_count=2`);
});

test("a lone negative id gives the no-note line", async () => {
  assert.equal(await run(db.client, ["-5"]), "no note #-5");
});

test("an unknown option and no id is BAD_ID", async () => {
  await assert.rejects(run(db.client, ["--foo"]), { code: "BAD_ID" });
});

test("an id after -- is read as the positional id", async () => {
  const note = await add(db.client, { title: "dashed" });
  assert.equal(await run(db.client, ["--", String(note.id)]), `#${note.id} m110609332_count=1`);
});
