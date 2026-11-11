import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111103344.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111103344"); });
after(async () => { await db.done(); });

test("m111103344 puts a tagged near note first and excludes an untagged nearer one", async () => {
  await add(db.client, { title: "untagged", embedding: [1, 0, 0] });
  const near = await add(db.client, { title: "near", tags: ["a"], embedding: [2, 0, 0] });
  const far = await add(db.client, { title: "far", tags: ["a"], embedding: [5, 0, 0] });
  assert.equal(await run(db.client, ["--tag", "a", "--embedding", "1,0,0"]), `#${near.id} near (1.000)\n#${far.id} far (4.000)`);
});

test("m111103344 caps the rows at k", async () => {
  assert.equal((await run(db.client, ["--tag", "a", "--embedding=1,0,0", "--k", "1"])).split("\n").length, 1);
});
