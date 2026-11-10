import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { loadRules } from "../../src/rules.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110609033"); });
after(async () => { await db.done(); });

test("a title of 61 characters is rejected by add()", async () => {
  await assert.rejects(add(db.client, { title: "a".repeat(61) }), (e) => e.message === "title longer than 60 characters");
});

test("the loaded rules include M110609033 and it flags a 61-character title", async () => {
  const rule = (await loadRules()).find((r) => r.code === "M110609033");
  assert.ok(rule);
  assert.equal(rule.check({ title: "a".repeat(61), body: "", tags: [] }), "title longer than 60 characters");
});

test("a title of 60 characters is stored unchanged", async () => {
  const row = await add(db.client, { title: "a".repeat(60) });
  assert.equal(row.title, "a".repeat(60));
});
