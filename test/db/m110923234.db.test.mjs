import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110923234.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
let near, tie, far, last;
before(async () => {
  db = await freshClient("m110923234");
  await add(db.client, { title: "untagged closer", embedding: [0, 0, 0] });
  far = await add(db.client, { title: "far", tags: ["target"], embedding: [0, 3, 0] });
  near = await add(db.client, { title: "near", tags: ["other", "target"], embedding: [1, 1, 0] });
  tie = await add(db.client, { title: "tie", tags: ["target"], embedding: [-1, 1, 0] });
  last = await add(db.client, { title: "last", tags: ["target"], embedding: [0, 5, 0] });
  await add(db.client, { title: "no embedding", tags: ["target"] });
});
after(async () => { await db.done(); });

const args = ["--tag", "target", "--embedding", "0,0,0"];

test("m110923234 filters by tag and embedding, orders distance then id and defaults to three rows", async () => {
  assert.equal(await run(db.client, args), `#${near.id} near (1.414)\n#${tie.id} tie (1.414)\n#${far.id} far (3.000)`);
});

test("m110923234 caps rows with k", async () => {
  assert.equal(await run(db.client, [...args, "--k", "1"]), `#${near.id} near (1.414)`);
});

test("m110923234 accepts decimal embeddings and negative embeddings in equals form", async () => {
  assert.equal(await run(db.client, ["--tag", "target", "--embedding=-1.0,1,0", "--k", "1"]), `#${tie.id} tie (0.000)`);
});

test("m110923234 accepts the maximum k and returns all matching notes", async () => {
  assert.equal(await run(db.client, [...args, "--k", "2147483647"]), `#${near.id} near (1.414)\n#${tie.id} tie (1.414)\n#${far.id} far (3.000)\n#${last.id} last (5.000)`);
});

test("m110923234 returns an empty string when no note matches", async () => {
  assert.equal(await run(db.client, ["--tag", "missing", "--embedding", "1,2,3"]), "");
});
