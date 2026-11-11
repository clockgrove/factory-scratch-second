import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111103349.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111103349"); });
after(async () => { await db.done(); });

test("tagged notes are ranked nearest first, untagged are excluded, k caps rows", async () => {
  const near = await add(db.client, { title: "near", tags: ["t"], embedding: [1, 0, 0] });
  const far = await add(db.client, { title: "far", tags: ["t"], embedding: [5, 0, 0] });
  await add(db.client, { title: "untagged", embedding: [1, 0, 0] });
  const args = ["--tag", "t", "--embedding", "1,0,0"];
  assert.equal(await run(db.client, args), `#${near.id} near (0.000)\n#${far.id} far (4.000)`);
  assert.equal(await run(db.client, [...args, "--k", "1"]), `#${near.id} near (0.000)`);
});
