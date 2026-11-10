import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111004321.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111004321"); });
after(async () => { await db.done(); });

test("m111004321 returns an empty string for an empty store", async () => {
  assert.equal(await run(db.client, []), "");
});

test("m111004321 returns three titles newest first and honors the limit bounds", async () => {
  await add(db.client, { title: "first" });
  await add(db.client, { title: "second" });
  await add(db.client, { title: "third" });
  assert.equal(await run(db.client, []), "third | second | first");
  assert.equal(await run(db.client, ["--limit", "2"]), "third | second");
  assert.equal(await run(db.client, ["--limit", "1"]), "third");
  assert.equal(await run(db.client, ["--limit", "2147483647"]), "third | second | first");
  assert.equal(await run(db.client, ["--limit", "02"]), "third | second");
});

test("m111004321 defaults to five titles", async () => {
  await add(db.client, { title: "fourth" });
  await add(db.client, { title: "fifth" });
  await add(db.client, { title: "sixth" });
  assert.equal(await run(db.client, []), "sixth | fifth | fourth | third | second");
});
