import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m110923232.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110923232"); });
after(async () => { await db.done(); });

test("a new note starts at zero and two bumps persist two", async () => {
  const column = await db.client.query("SELECT data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = 'notes' AND column_name = 'm110923232_count'");
  assert.deepEqual(column.rows, [{ data_type: "integer", is_nullable: "NO", column_default: "0" }]);
  const note = await add(db.client, { title: "counter" });
  const { rows } = await db.client.query("SELECT m110923232_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m110923232_count, 0);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110923232_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110923232_count=2`);
  const stored = await db.client.query("SELECT m110923232_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(stored.rows[0].m110923232_count, 2);
});

test("unknown ids return the original no-note line", async () => {
  assert.equal(await run(db.client, ["-0007"]), "no note #-0007");
  assert.equal(await run(db.client, ["-2147483648"]), "no note #-2147483648");
  assert.equal(await run(db.client, ["2147483647"]), "no note #2147483647");
});

test("out-of-int4 ids return no note without querying", async () => {
  const client = { query() { assert.fail("out-of-range ids must not query"); } };
  for (const id of ["2147483648", "-2147483649", "9999999999999999999999999999999999999999"]) {
    assert.equal(await run(client, [id]), `no note #${id}`);
  }
  assert.equal(await run(db.client, ["2147483648"]), "no note #2147483648");
});

test("missing and malformed ids fail with BAD_ID", async () => {
  for (const args of [[], ...["1.5", "1e2", "0x10", "+7", " 7", "", "--id", "7\n"].map((id) => [id])]) {
    await assert.rejects(run(db.client, args), { code: "BAD_ID" });
  }
});

test("literal ids preserve leading zeros and ignore trailing arguments", async () => {
  const note = await add(db.client, { title: "literal id" });
  const id = `00${note.id}`;
  assert.equal(await run(db.client, [id, "--ignored", "1e2"]), `#${id} m110923232_count=1`);
});
