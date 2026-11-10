import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m111007032.mjs";
import { command } from "../../src/commands.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111007032"); });
after(async () => { await db.done(); });

test("the bump command is discovered by name", async () => {
  assert.equal(await command("bump-m111007032"), run);
});

test("a new note starts at zero and two bumps persist two", async () => {
  const note = await add(db.client, { title: "counter" });
  assert.equal(note.m111007032_count, 0);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111007032_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111007032_count=2`);
  const { rows } = await db.client.query("SELECT m111007032_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m111007032_count, 2);
});

test("unknown ids return the given id", async () => {
  assert.equal(await run(db.client, ["-007"]), "no note #-007");
});

test("out-of-int4 ids return no note without querying", async () => {
  let calls = 0;
  const query = db.client.query;
  db.client.query = (...args) => { calls++; return query.apply(db.client, args); };
  try {
    for (const id of ["2147483648", "-2147483649", "9999999999999999999999999999999999999999"]) {
      assert.equal(await run(db.client, [id]), `no note #${id}`);
    }
    assert.equal(calls, 0);
  } finally {
    db.client.query = query;
  }
});

test("missing and nondecimal ids throw BAD_ID", async () => {
  for (const args of [[], ["1.5"], ["1e2"], ["0x10"], ["+7"], [" 7"], [""]]) {
    await assert.rejects(run(db.client, args), { code: "BAD_ID" });
  }
});

test("literal leading zero ids and trailing arguments are preserved and ignored", async () => {
  const note = await add(db.client, { title: "literal" });
  const id = `00${note.id}`;
  assert.equal(await run(db.client, [id, "--anything"]), `#${id} m111007032_count=1`);
});

test("negative ids and both int4 boundaries can be bumped", async () => {
  for (const id of ["-7", "-2147483648", "2147483647"]) {
    await db.client.query("INSERT INTO notes (id, title) VALUES ($1, $2)", [id, "boundary"]);
    assert.equal(await run(db.client, [id]), `#${id} m111007032_count=1`);
  }
});
