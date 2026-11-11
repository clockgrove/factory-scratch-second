import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/untagged30.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("untagged30"); });
after(async () => { await db.done(); });

test("counts notes with no tag, and --min above the count reports fewer", async () => {
  await add(db.client, { title: "one" });
  await add(db.client, { title: "two", tags: [] });
  await add(db.client, { title: "tagged", tags: ["x"] });
  assert.equal(await run(db.client, []), "2 untagged");
  assert.equal(await run(db.client, ["--min", "3"]), "fewer than 3 untagged");
});
