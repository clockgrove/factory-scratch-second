import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { exporter } from "../../src/export.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110623310"); });
after(async () => { await db.done(); });

test("m110623310 exports one tab-separated line per note, newest first", async () => {
  const a = await add(db.client, { title: "first", tags: ["a"] });
  const b = await add(db.client, { title: "second", tags: ["a", "b"] });
  const out = (await exporter("m110623310"))(await list(db.client));
  assert.equal(out, `${b.id}\tsecond\ta;b\n${a.id}\tfirst\ta`);
});
