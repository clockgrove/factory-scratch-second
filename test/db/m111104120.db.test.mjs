import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { exporter } from "../../src/export.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111104120"); });
after(async () => { await db.done(); });

test("m111104120 formats two listed notes", async () => {
  const a = await add(db.client, { title: "first", tags: ["x", "y"] });
  const b = await add(db.client, { title: "second", tags: ["z"] });
  const out = (await exporter("m111104120"))(await list(db.client));
  assert.equal(out, `${b.id}\tsecond\tz\n${a.id}\tfirst\tx;y`);
});
