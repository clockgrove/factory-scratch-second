import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110608363"); });
after(async () => { await db.done(); });

test("a title of 61 characters is rejected with its code", async () => {
  await assert.rejects(add(db.client, { title: "a".repeat(61) }), (e) => e.code === "M110608363");
});

test("a title of 60 characters is stored unchanged", async () => {
  const row = await add(db.client, { title: "a".repeat(60) });
  assert.equal(row.title, "a".repeat(60));
});
