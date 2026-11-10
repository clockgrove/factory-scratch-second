import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/list.mjs";
import { format } from "../../src/export/m111004320.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111004320"); });
after(async () => { await db.done(); });

test("m111004320 formats listed notes and is discovered by notes list", async () => {
  const first = await add(db.client, { title: "first", tags: ["x", "y"] });
  const second = await add(db.client, { title: "second", tags: [] });
  const expected = `${second.id}\tsecond\t\n${first.id}\tfirst\tx;y`;
  assert.equal(format(await list(db.client)), expected);
  assert.equal(await run(db.client, ["--format", "m111004320"]), expected);
});
