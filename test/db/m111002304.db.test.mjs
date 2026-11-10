import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111002304.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111002304"); });
after(async () => { await db.done(); });

test("m111002304 orders tagged embedded notes by distance then id and defaults to three rows", async () => {
  await add(db.client, { title: "untagged nearer", embedding: [0, 0, 0] });
  await add(db.client, { title: "no embedding", tags: ["x"] });
  const far = await add(db.client, { title: "far", tags: ["x"], embedding: [0, 5, 0] });
  const near = await add(db.client, { title: "near", tags: ["other", "x"], embedding: [1, 0, 0] });
  const tie = await add(db.client, { title: "tie", tags: ["x"], embedding: [0, 1, 0] });
  await add(db.client, { title: "farthest", tags: ["x"], embedding: [0, 10, 0] });
  assert.equal(await run(db.client, ["--tag", "x", "--embedding", "0,0,0"]), `#${near.id} near (1.000)\n#${tie.id} tie (1.000)\n#${far.id} far (5.000)`);
});

test("m111002304 caps rows at k and accepts an equals-form negative embedding", async () => {
  const near = await add(db.client, { title: "negative near", tags: ["negative"], embedding: [-1, 2, 3] });
  await add(db.client, { title: "negative far", tags: ["negative"], embedding: [2, 2, 3] });
  assert.equal(await run(db.client, ["--tag", "negative", "--embedding=-1,2,3", "--k", "1"]), `#${near.id} negative near (0.000)`);
});

test("m111002304 returns an empty string when no note matches", async () => {
  assert.equal(await run(db.client, ["--tag", "absent", "--embedding", "1,2,3", "--k", "2147483647"]), "");
});
