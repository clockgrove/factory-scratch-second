import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110608364.mjs";
import { add, similarByTag } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110608364"); });
after(async () => { await db.done(); });

test("a tagged near note comes first with distance 0", async () => {
  const near = await add(db.client, { title: "near", tags: ["t1"], embedding: [1, 0, 0] });
  await add(db.client, { title: "far", tags: ["t1"], embedding: [0, 10, 0] });
  const rows = await similarByTag(db.client, "t1", [1, 0, 0]);
  assert.equal(rows[0].id, near.id);
  assert.equal(Number(rows[0].distance), 0);
});

test("an untagged nearer note is excluded", async () => {
  const untagged = await add(db.client, { title: "untagged", tags: [], embedding: [1, 0, 0] });
  const tagged = await add(db.client, { title: "tagged", tags: ["t2"], embedding: [0, 5, 0] });
  const rows = await similarByTag(db.client, "t2", [1, 0, 0]);
  assert.equal(rows[0].id, tagged.id);
  assert.equal(rows.map((r) => r.id).includes(untagged.id), false);
});

test("k caps the rows", async () => {
  for (const x of [1, 2, 3]) await add(db.client, { title: `n${x}`, tags: ["t3"], embedding: [x, 0, 0] });
  const rows = await similarByTag(db.client, "t3", [0, 0, 0], 2);
  assert.equal(rows.length, 2);
});

test("notes at the same distance come in ascending id order", async () => {
  const a = await add(db.client, { title: "a", tags: ["t4"], embedding: [2, 2, 2] });
  const b = await add(db.client, { title: "b", tags: ["t4"], embedding: [2, 2, 2] });
  const rows = await similarByTag(db.client, "t4", [2, 2, 2]);
  assert.deepEqual(rows.map((r) => r.id), [a.id, b.id]);
});

test("the command prints one line per result with the distance to 3 decimals", async () => {
  const near = await add(db.client, { title: "near", tags: ["t5"], embedding: [1, 0, 0] });
  const far = await add(db.client, { title: "far", tags: ["t5"], embedding: [1, 2, 0] });
  const out = await run(db.client, ["--tag", "t5", "--embedding", "1,0,0"]);
  assert.equal(out, `#${near.id} near (0.000)\n#${far.id} far (2.000)`);
});

test("the command passes --k to the store", async () => {
  const one = await add(db.client, { title: "one", tags: ["t6"], embedding: [0, 0, 1] });
  await add(db.client, { title: "two", tags: ["t6"], embedding: [0, 0, 3] });
  const out = await run(db.client, ["--tag", "t6", "--embedding", "0,0,0", "--k", "1"]);
  assert.equal(out, `#${one.id} one (1.000)`);
});
