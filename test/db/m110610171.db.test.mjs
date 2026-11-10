import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110610171.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110610171"); });
after(async () => { await db.done(); });

test("an empty store returns an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("the default lists the newest titles first", async () => {
  for (const title of ["one", "two", "three"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "three | two | one");
});

test("--limit 2 keeps the two newest titles", async () => {
  assert.equal(await run(db.client, ["--limit", "2"]), "three | two");
});

test("a --limit beyond bigint still lists every title", async () => {
  assert.equal(await run(db.client, ["--limit", "99999999999999999999"]), "three | two | one");
});
