import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110608361.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110608361"); });
after(async () => { await db.done(); });

test("an empty store returns an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("titles are joined newest first", async () => {
  for (const title of ["one", "two", "three"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "three | two | one");
});

test("--limit caps the number of titles", async () => {
  assert.equal(await run(db.client, ["--limit", "2"]), "three | two");
});

test("without --limit at most five titles are returned", async () => {
  for (const title of ["four", "five", "six"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "six | five | four | three | two");
});
