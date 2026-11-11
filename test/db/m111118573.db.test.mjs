import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111118573"); });
after(async () => { await db.done(); });

test("add rejects a title containing the word m111118573 with its rule code", async () => {
  await assert.rejects(add(db.client, { title: "before m111118573 after" }), {
    code: "M111118573",
    message: "title contains m111118573",
  });
});

test("add accepts a title without the word m111118573", async () => {
  const note = await add(db.client, { title: "allowed title" });
  assert.equal(note.title, "allowed title");
});
