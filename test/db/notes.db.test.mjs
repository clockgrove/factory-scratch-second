import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { exporter } from "../../src/export.mjs";
import { add, list, remove, similar } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("notes"); });
after(async () => { await db.done(); });

test("add, list newest first, filter by tag, remove", async () => {
  const a = await add(db.client, { title: "first", tags: ["x"] });
  const b = await add(db.client, { title: "second", tags: ["x", "y"] });
  assert.deepEqual((await list(db.client)).map((r) => r.id), [b.id, a.id]);
  assert.deepEqual((await list(db.client, { tag: "y" })).map((r) => r.id), [b.id]);
  assert.equal(await remove(db.client, a.id), true);
  assert.equal(await remove(db.client, a.id), false);
});

test("similar returns the nearest embeddings first with a distance", async () => {
  const near = await add(db.client, { title: "near", embedding: [1, 0, 0] });
  await add(db.client, { title: "far", embedding: [0, 10, 0] });
  const rows = await similar(db.client, [1, 0, 0], 2);
  assert.equal(rows[0].id, near.id);
  assert.equal(Number(rows[0].distance), 0);
});

test("export formats render the listed rows", async () => {
  const rows = await list(db.client, { tag: "x" });
  assert.match((await exporter("table"))(rows), /^id {3}title/);
  assert.equal((await exporter("json"))(rows).split("\n").length, rows.length);
});
