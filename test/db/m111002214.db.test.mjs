import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111002214.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111002214"); });
after(async () => { await db.done(); });

test("a tag nobody has returns an empty string", async () => {
  assert.equal(await run(db.client, ["--tag", "t", "--embedding", "1,0,0"]), "");
});

test("tagged notes come nearest first and untagged notes are excluded", async () => {
  await add(db.client, { title: "nearest", embedding: [1, 0, 0] });
  const near = await add(db.client, { title: "near", tags: ["t"], embedding: [1, 1, 0] });
  const far = await add(db.client, { title: "far", tags: ["t"], embedding: [5, 0, 0] });
  assert.equal(await run(db.client, ["--tag", "t", "--embedding", "1,0,0"]), `#${near.id} near (1.000)\n#${far.id} far (4.000)`);
});

test("--k 1 keeps only the nearest note", async () => {
  const rows = await db.client.query("SELECT id FROM notes WHERE title = 'near'");
  assert.equal(await run(db.client, ["--tag", "t", "--embedding", "1,0,0", "--k", "1"]), `#${rows.rows[0].id} near (1.000)`);
});

test("--embedding=-1,0,0 accepts a negative number", async () => {
  const rows = await db.client.query("SELECT id FROM notes WHERE title = 'near'");
  assert.equal(await run(db.client, ["--tag", "t", "--embedding=-1,0,0", "--k", "1"]), `#${rows.rows[0].id} near (2.236)`);
});
