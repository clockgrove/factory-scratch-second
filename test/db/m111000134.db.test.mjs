import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111000134.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
let near;
let farther;
before(async () => {
  db = await freshClient("m111000134");
  await add(db.client, { title: "untagged", tags: ["other"], embedding: [1, 0, 0] });
  near = await add(db.client, { title: "near", tags: ["a"], embedding: [1, 1, 0] });
  farther = await add(db.client, { title: "farther", tags: ["a"], embedding: [5, 5, 5] });
});
after(async () => { await db.done(); });

test("a tagged near note comes first and an untagged nearer note is excluded", async () => {
  const out = await run(db.client, ["--tag", "a", "--embedding", "1,0,0"]);
  assert.equal(out, `#${near.id} near (1.000)\n#${farther.id} farther (8.124)`);
});

test("k caps the rows", async () => {
  assert.equal(await run(db.client, ["--tag", "a", "--embedding=1,0,0", "--k", "1"]), `#${near.id} near (1.000)`);
});
