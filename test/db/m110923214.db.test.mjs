import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110923214.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
let near;
let far;
before(async () => {
  db = await freshClient("m110923214");
  near = await add(db.client, { title: "tagged near", tags: ["t"], embedding: [1, 0, 0] });
  await add(db.client, { title: "untagged nearest", tags: [], embedding: [0, 0, 0] });
  far = await add(db.client, { title: "tagged far", tags: ["t"], embedding: [5, 0, 0] });
});
after(async () => { await db.done(); });

test("a tagged near note comes first and an untagged nearer note is excluded", async () => {
  const out = await run(db.client, ["--tag", "t", "--embedding", "0,0,0"]);
  assert.equal(out, `#${near.id} tagged near (1.000)\n#${far.id} tagged far (5.000)`);
});

test("k caps the rows", async () => {
  const out = await run(db.client, ["--tag", "t", "--embedding=0,0,0", "--k", "1"]);
  assert.equal(out, `#${near.id} tagged near (1.000)`);
});

test("no matching note returns an empty string", async () => {
  assert.equal(await run(db.client, ["--tag", "none", "--embedding", "0,0,0"]), "");
});
