import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110609031.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110609031"); });
after(async () => { await db.done(); });

test("an empty store gives an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("the default limit lists the titles newest first", async () => {
  await add(db.client, { title: "first" });
  await add(db.client, { title: "second" });
  await add(db.client, { title: "third" });
  assert.equal(await run(db.client, []), "third | second | first");
});

test("--limit 2 keeps only the two newest titles", async () => {
  assert.equal(await run(db.client, ["--limit", "2"]), "third | second");
});

test("the default limit is five titles", async () => {
  await add(db.client, { title: "fourth" });
  await add(db.client, { title: "fifth" });
  await add(db.client, { title: "sixth" });
  assert.equal(await run(db.client, []), "sixth | fifth | fourth | third | second");
});
