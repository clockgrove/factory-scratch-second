import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110923231.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110923231"); });
after(async () => { await db.done(); });

test("m110923231 returns an empty string for an empty store", async () => {
  assert.equal(await run(db.client, []), "");
});

test("m110923231 returns newest titles with exact separators and respects the limit", async () => {
  for (const title of ["first", "second", "third"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "third | second | first");
  assert.equal(await run(db.client, ["--limit", "2"]), "third | second");
  assert.equal(await run(db.client, ["--limit", "1"]), "third");
  assert.equal(await run(db.client, ["--limit", "02"]), "third | second");
  assert.equal(await run(db.client, ["--limit", "2147483647"]), "third | second | first");
});

test("m110923231 defaults to the newest five titles", async () => {
  for (const title of ["fourth", "fifth", "sixth"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "sixth | fifth | fourth | third | second");
});
