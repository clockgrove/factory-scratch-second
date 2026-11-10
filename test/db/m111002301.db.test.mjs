import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111002301.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => {
  db = await freshClient("m111002301");
  await add(db.client, { title: "first" });
  await add(db.client, { title: "second" });
  await add(db.client, { title: "third" });
});
after(async () => { await db.done(); });

test("default returns titles newest first with the exact separator", async () => {
  assert.equal(await run(db.client, []), "third | second | first");
});

test("limit caps the newest titles", async () => {
  assert.equal(await run(db.client, ["--limit", "2"]), "third | second");
});

test("the minimum limit returns only the newest title", async () => {
  assert.equal(await run(db.client, ["--limit", "1"]), "third");
});

test("the maximum limit is accepted", async () => {
  assert.equal(await run(db.client, ["--limit", "2147483647"]), "third | second | first");
});

test("an empty store returns an empty string", async () => {
  const empty = await freshClient("m111002301_empty");
  try {
    assert.equal(await run(empty.client, []), "");
  } finally {
    await empty.done();
  }
});
