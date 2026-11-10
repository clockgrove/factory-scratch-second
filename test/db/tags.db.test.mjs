import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { run } from "../../src/commands/tags.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("tags"); });
beforeEach(async () => { await db.client.query("DELETE FROM notes"); });
after(async () => { await db.done(); });

async function seed() {
  await add(db.client, { title: "one", tags: ["b", "A", "c", "c"] });
  await add(db.client, { title: "two", tags: ["b", "a", "A"] });
  await add(db.client, { title: "three", tags: ["b", "a"] });
}

test("an empty store prints nothing", async () => {
  assert.equal(await run(db.client, []), "");
});

test("tags are ordered by count, ties in byte order, and a repeated tag counts once", async () => {
  await seed();
  assert.equal(await run(db.client, []), "b\t3\nA\t2\na\t2\nc\t1");
});

test("--min 2 leaves out tags on a single note", async () => {
  await seed();
  assert.equal(await run(db.client, ["--min", "2"]), "b\t3\nA\t2\na\t2");
});

test("every note counts, not only the first hundred", async () => {
  for (let i = 0; i < 101; i++) await add(db.client, { title: `n${i}`, tags: ["many"] });
  assert.equal(await run(db.client, []), "many\t101");
});

test("--min above every count, however large, prints nothing", async () => {
  await seed();
  assert.equal(await run(db.client, ["--min", "3000000000"]), "");
  assert.equal(await run(db.client, ["--min", "99999999999999999999999"]), "");
  assert.equal(await run(db.client, ["--min", "03"]), "b\t3");
});
