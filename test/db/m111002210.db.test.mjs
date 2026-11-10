import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/list.mjs";
import { format } from "../../src/export/m111002210.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111002210"); });
after(async () => { await db.done(); });

test("m111002210 formats two stored notes through list and the list command", async () => {
  const first = await add(db.client, { title: "first", tags: ["x", "y"] });
  const second = await add(db.client, { title: "second", tags: [] });
  const expected = `${second.id}\tsecond\t\n${first.id}\tfirst\tx;y`;
  assert.equal(format(await list(db.client)), expected);
  assert.equal(await run(db.client, ["--format", "m111002210"]), expected);
});
