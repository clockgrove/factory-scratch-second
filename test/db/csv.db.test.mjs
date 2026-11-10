import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/list.mjs";
import { format } from "../../src/export/csv.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("csv"); });
after(async () => { await db.done(); });

test("csv renders two stored notes through list and notes list --format csv", async () => {
  const first = await add(db.client, { title: "first, one", body: "b", tags: ["x", "y"] });
  const second = await add(db.client, { title: "second", body: "two\nlines", tags: [] });
  const expected = `id,title,body,tags\n${second.id},second,"two\nlines",\n${first.id},"first, one",b,x;y`;
  assert.equal(format(await list(db.client)), expected);
  assert.equal(await run(db.client, ["--format", "csv"]), expected);
  assert.equal(await run(db.client, ["--format", "csv", "--tag", "x", "--limit", "1"]), `id,title,body,tags\n${first.id},"first, one",b,x;y`);
});
