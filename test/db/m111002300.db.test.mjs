import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../../src/commands/list.mjs";
import { format } from "../../src/export/m111002300.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

test("m111002300 formats stored notes and is reached by notes list --format", async () => {
  const db = await freshClient("m111002300");
  try {
    const first = await add(db.client, { title: "first", tags: ["x", "y"] });
    const second = await add(db.client, { title: "second", tags: [] });
    const expected = `${second.id}\tsecond\t\n${first.id}\tfirst\tx;y`;
    assert.equal(format(await list(db.client)), expected);
    assert.equal(await run(db.client, ["--format", "m111002300"]), expected);
  } finally {
    await db.done();
  }
});
