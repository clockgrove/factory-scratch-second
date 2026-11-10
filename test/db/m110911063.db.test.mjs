import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110911063"); });
after(async () => { await db.done(); });

test("a title containing m110911063 is rejected with its code and message", async () => {
  await assert.rejects(
    add(db.client, { title: "about m110911063 today" }),
    (e) => e.code === "M110911063" && e.message === "title contains m110911063",
  );
});

test("a plain title is stored unchanged", async () => {
  const row = await add(db.client, { title: "plain title" });
  assert.equal(row.title, "plain title");
});
