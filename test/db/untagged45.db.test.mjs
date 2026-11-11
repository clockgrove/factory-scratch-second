import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/untagged45.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => {
  db = await freshClient("untagged45");
  await add(db.client, { title: "one" });
  await add(db.client, { title: "two", tags: [] });
  await add(db.client, { title: "tagged", tags: ["x"] });
});
after(async () => { await db.done(); });

test("two untagged notes and one tagged note give 2 untagged", async () => {
  assert.equal(await run(db.client, []), "2 untagged");
});

test("--min 3 above the count gives fewer than 3 untagged", async () => {
  assert.equal(await run(db.client, ["--min", "3"]), "fewer than 3 untagged");
});
