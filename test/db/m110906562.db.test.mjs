import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m110906562.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110906562"); });
after(async () => { await db.done(); });

test("a new note starts at 0", async () => {
  const note = await add(db.client, { title: "fresh" });
  const { rows } = await db.client.query("SELECT m110906562_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m110906562_count, 0);
});

test("two bumps give 2", async () => {
  const note = await add(db.client, { title: "bumped" });
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110906562_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110906562_count=2`);
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

test("a lone negative id gives the no-note line", async () => {
  assert.equal(await run(db.client, ["-5"]), "no note #-5");
  assert.equal(await run(db.client, ["-5", "x"]), "no note #-5");
});

test("an id followed by an option bumps that note", async () => {
  const note = await add(db.client, { title: "optioned" });
  assert.equal(await run(db.client, [String(note.id), "--foo"]), `#${note.id} m110906562_count=1`);
  assert.equal(await run(db.client, [String(note.id), "-x"]), `#${note.id} m110906562_count=2`);
});

test("an id that is not plain decimal digits is BAD_ID", async () => {
  for (const raw of ["1.0", "+1", "0x10", "1e3", "0b101", " 5 ", "--", "--foo"]) {
    await assert.rejects(run(db.client, [raw]), { code: "BAD_ID" }, raw);
  }
});

test("a huge id is echoed exactly in the no-note line", async () => {
  assert.equal(await run(db.client, ["99999999999999999999"]), "no note #99999999999999999999");
});
