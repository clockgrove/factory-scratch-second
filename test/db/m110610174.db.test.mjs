import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110610174.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110610174"); });
after(async () => { await db.done(); });

test("a tagged near note comes first with distance 0.000", async () => {
  const near = await add(db.client, { title: "near", tags: ["t1"], embedding: [1, 0, 0] });
  await add(db.client, { title: "far", tags: ["t1"], embedding: [0, 10, 0] });
  const out = await run(db.client, ["--tag", "t1", "--embedding", "1,0,0"]);
  assert.equal(out.split("\n")[0], `#${near.id} near (0.000)`);
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

test("notes at the same distance come in ascending id order", async () => {
  const a = await add(db.client, { title: "a", tags: ["t4"], embedding: [2, 2, 2] });
  const b = await add(db.client, { title: "b", tags: ["t4"], embedding: [2, 2, 2] });
  const out = await run(db.client, ["--tag", "t4", "--embedding", "2,2,2"]);
  assert.equal(out, `#${a.id} a (0.000)\n#${b.id} b (0.000)`);
});

test("the command returns an empty string when no note carries the tag", async () => {
  await add(db.client, { title: "other", tags: ["t5"], embedding: [1, 0, 0] });
  const out = await run(db.client, ["--tag", "unused", "--embedding", "1,0,0"]);
  assert.equal(out, "");
});
