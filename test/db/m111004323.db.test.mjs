import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111004323"); });
after(async () => { await db.done(); });

test("add rejects the m111004323 word with its rule code", async () => {
  await assert.rejects(add(db.client, { title: "a m111004323 note" }), {
    code: "M111004323",
    message: "title contains m111004323",
  });
});

test("add accepts a title without the m111004323 word", async () => {
  const note = await add(db.client, { title: "ordinary note" });
  assert.equal(note.title, "ordinary note");
});
