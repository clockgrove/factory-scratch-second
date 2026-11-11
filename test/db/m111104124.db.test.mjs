import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111104124.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111104124"); });
after(async () => { await db.done(); });

test("a tagged near note comes first", async () => {
  const near = await add(db.client, { title: "near", tags: ["t1"], embedding: [1, 0, 0] });
  const far = await add(db.client, { title: "far", tags: ["t1"], embedding: [0, 10, 0] });
  const out = await run(db.client, ["--tag", "t1", "--embedding", "1,0,0"]);
  assert.equal(out, `#${near.id} near (0.000)\n#${far.id} far (10.050)`);
});

test("an untagged nearer note is excluded", async () => {
  await add(db.client, { title: "untagged", tags: [], embedding: [1, 0, 0] });
  const tagged = await add(db.client, { title: "tagged", tags: ["t2"], embedding: [0, 5, 0] });
  const out = await run(db.client, ["--tag", "t2", "--embedding", "1,0,0"]);
  assert.equal(out, `#${tagged.id} tagged (5.099)`);
});

test("k caps the rows", async () => {
  const ids = [];
  for (const x of [1, 2, 3]) ids.push((await add(db.client, { title: `n${x}`, tags: ["t3"], embedding: [x, 0, 0] })).id);
  const out = await run(db.client, ["--tag", "t3", "--embedding", "0,0,0", "--k", "2"]);
  assert.equal(out, `#${ids[0]} n1 (1.000)\n#${ids[1]} n2 (2.000)`);
});

test("the output has one line per note with the distance to 3 decimals", async () => {
  const near = await add(db.client, { title: "near", tags: ["t4"], embedding: [1, 0, 0] });
  const far = await add(db.client, { title: "far", tags: ["t4"], embedding: [1, 2, 0] });
  const out = await run(db.client, ["--tag", "t4", "--embedding", "1,0,0"]);
  assert.equal(out, `#${near.id} near (0.000)\n#${far.id} far (2.000)`);
});

test("no matching note gives an empty string", async () => {
  assert.equal(await run(db.client, ["--tag", "t5", "--embedding", "1,0,0"]), "");
});
