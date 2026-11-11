import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111103346.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111103346"); });
after(async () => { await db.done(); });

test("an empty store gives an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("newest titles come first, joined by a bar, and --limit cuts the list", async () => {
  for (const title of ["one", "two", "three"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "three | two | one");
  assert.equal(await run(db.client, ["--limit", "2"]), "three | two");
});
