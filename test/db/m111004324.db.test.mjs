import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111004324.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111004324"); });
after(async () => { await db.done(); });

test("no matching embedded note returns an empty string", async () => {
  await add(db.client, { title: "no vector", tags: ["empty"] });
  assert.equal(await run(db.client, ["--tag", "empty", "--embedding", "0,0,0"]), "");
});

test("tagged notes sort by distance then id, exclude untagged notes, and obey k", async () => {
  await add(db.client, { title: "untagged nearer", embedding: [0, 0, 0] });
  await add(db.client, { title: "no embedding", tags: ["work"] });
  const far = await add(db.client, { title: "far", tags: ["work"], embedding: [4, 0, 0] });
  const near = await add(db.client, { title: "near", tags: ["other", "work"], embedding: [1, 1, 0] });
  const tie = await add(db.client, { title: "tie", tags: ["work"], embedding: [-1, 1, 0] });
  const middle = await add(db.client, { title: "middle", tags: ["work"], embedding: [3, 0, 0] });
  const args = ["--tag", "work", "--embedding", "0,0,0"];
  const lines = [`#${near.id} near (1.414)`, `#${tie.id} tie (1.414)`, `#${middle.id} middle (3.000)`, `#${far.id} far (4.000)`];
  assert.equal(await run(db.client, args), lines.slice(0, 3).join("\n"));
  assert.equal(await run(db.client, [...args, "--k", "1"]), lines[0]);
  assert.equal(await run(db.client, [...args, "--k", "2147483647"]), lines.join("\n"));
});

test("negative embeddings use the equals form and decimal components are accepted", async () => {
  const note = await add(db.client, { title: "negative", tags: ["negative"], embedding: [-1, 2.5, 3] });
  assert.equal(await run(db.client, ["--tag", "negative", "--embedding=-1,2.5,3"]), `#${note.id} negative (0.000)`);
});
