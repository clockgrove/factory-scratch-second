import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m111002302.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111002302"); });
after(async () => { await db.done(); });

test("a new note starts at zero", async () => {
  const note = await add(db.client, { title: "default counter" });
  const { rows } = await db.client.query("SELECT m111002302_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m111002302_count, 0);
});

test("two bumps give two", async () => {
  const note = await add(db.client, { title: "counter" });
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111002302_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111002302_count=2`);
  const { rows } = await db.client.query("SELECT m111002302_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m111002302_count, 2);
});

test("unknown ids including int4 boundaries return the no-note line", async () => {
  for (const id of ["2147483647", "-2147483648", "-0", "000000"]) {
    assert.equal(await run(db.client, [id]), `no note #${id}`);
  }
});

test("out-of-range ids return the no-note line on the real database", async () => {
  assert.equal(await run(db.client, ["2147483648"]), "no note #2147483648");
});

test("out-of-range ids never query", async () => {
  const client = { query() { assert.fail("out-of-range ids must not query"); } };
  for (const id of ["2147483648", "-2147483649", "0002147483648", "999999999999999999999999999999"]) {
    assert.equal(await run(client, [id]), `no note #${id}`);
  }
});

test("a missing id fails with BAD_ID", async () => {
  await assert.rejects(run(db.client, []), { code: "BAD_ID" });
});

test("malformed ids fail with BAD_ID", async () => {
  for (const id of ["1.5", "1e2", "0x10", "+7", " 7", "", "7 ", "--7", "--help"]) {
    await assert.rejects(run(db.client, [id]), { code: "BAD_ID" });
  }
});

test("a successful bump preserves the supplied id text and ignores later arguments", async () => {
  const note = await add(db.client, { title: "raw id" });
  const id = `000${note.id}`;
  assert.equal(await run(db.client, [id, "--help", "ignored"]), `#${id} m111002302_count=1`);
});
