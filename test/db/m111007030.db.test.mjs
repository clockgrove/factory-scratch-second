import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { exporter } from "../../src/export.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111007030"); });
after(async () => { await db.done(); });

test("m111007030 renders listed notes newest first", async () => {
  const a = await add(db.client, { title: "first", tags: ["x"] });
  const b = await add(db.client, { title: "second", tags: ["x", "y"] });
  const out = (await exporter("m111007030"))(await list(db.client));
  assert.equal(out, `${b.id}\tsecond\tx;y\n${a.id}\tfirst\tx`);
});
