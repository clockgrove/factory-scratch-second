import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110906563"); });
after(async () => { await db.done(); });

test("a title containing m110906563 is rejected with its code and message", async () => {
  await assert.rejects(
    add(db.client, { title: "about m110906563 today" }),
    (e) => e.code === "M110906563" && e.message === "title contains m110906563",
  );
});

test("a plain title is stored unchanged", async () => {
  const row = await add(db.client, { title: "plain title" });
  assert.equal(row.title, "plain title");
});
