import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111104121.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111104121"); });
after(async () => { await db.done(); });

test("an empty store gives an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("titles come newest first and --limit caps them", async () => {
  for (const title of ["one", "two", "three"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "three | two | one");
  assert.equal(await run(db.client, ["--limit", "2"]), "three | two");
});
