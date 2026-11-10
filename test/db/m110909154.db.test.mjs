import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110909154.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
let near;
let mid;
before(async () => {
  db = await freshClient("m110909154");
  await add(db.client, { title: "untagged", tags: ["other"], embedding: [1, 2, 3] });
  near = await add(db.client, { title: "near", tags: ["t"], embedding: [1, 2, 4] });
  mid = await add(db.client, { title: "mid", tags: ["t", "u"], embedding: [1, 2, 6] });
  await add(db.client, { title: "far", tags: ["t"], embedding: [1, 2, 13] });
});
after(async () => { await db.done(); });

test("m110909154 puts the tagged near note first", async () => {
  const lines = (await run(db.client, ["--tag", "t", "--embedding", "1,2,3"])).split("\n");
  assert.equal(lines[0], `#${near.id} near (1.000)`);
});

test("m110909154 excludes an untagged nearer note", async () => {
  const out = await run(db.client, ["--tag", "t", "--embedding", "1,2,3"]);
  assert.doesNotMatch(out, /untagged/);
});

test("m110909154 caps the rows at k", async () => {
  const out = await run(db.client, ["--tag", "t", "--embedding", "1,2,3", "--k", "2"]);
  assert.equal(out, `#${near.id} near (1.000)\n#${mid.id} mid (3.000)`);
});

test("m110909154 returns an empty string when no note carries the tag", async () => {
  assert.equal(await run(db.client, ["--tag", "none", "--embedding", "1,2,3"]), "");
});
