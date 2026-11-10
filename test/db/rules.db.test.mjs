import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("rules"); });
after(async () => { await db.done(); });

test("a rule rejects a blank title with its code", async () => {
  await assert.rejects(add(db.client, { title: "  " }), (e) => e.code === "TITLE_REQUIRED");
});

test("a note with a title passes every rule", async () => {
  const row = await add(db.client, { title: "kept" });
  assert.equal(row.title, "kept");
});
