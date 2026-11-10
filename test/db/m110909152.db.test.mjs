import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m110909152.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110909152"); });
after(async () => { await db.done(); });

test("m110909152 count starts at 0", async () => {
  const n = await add(db.client, { title: "fresh" });
  const { rows } = await db.client.query("SELECT m110909152_count FROM notes WHERE id = $1", [n.id]);
  assert.equal(rows[0].m110909152_count, 0);
});

test("m110909152 two bumps give 2", async () => {
  const n = await add(db.client, { title: "bumped" });
  assert.equal(await run(db.client, [String(n.id)]), `#${n.id} m110909152_count=1`);
  assert.equal(await run(db.client, [String(n.id)]), `#${n.id} m110909152_count=2`);
});

test("m110909152 unknown id gives the no-note line", async () => {
  assert.equal(await run(db.client, ["999999"]), "no note #999999");
});

test("m110909152 id beyond the integer range gives the no-note line", async () => {
  assert.equal(await run(db.client, ["2147483648"]), "no note #2147483648");
});

test("m110909152 rejects a missing id with BAD_ID", async () => {
  await assert.rejects(run(db.client, []), { code: "BAD_ID" });
});

test("m110909152 rejects exponent notation with BAD_ID", async () => {
  await assert.rejects(run(db.client, ["1e2"]), { code: "BAD_ID" });
});
