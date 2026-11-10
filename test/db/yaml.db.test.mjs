import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/list.mjs";
import { format } from "../../src/export/yaml.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("yaml"); });
after(async () => { await db.done(); });

test("yaml renders two stored notes through list and notes list --format yaml", async () => {
  const first = await add(db.client, { title: "first: one", body: "b", tags: ["x", "y"] });
  const second = await add(db.client, { title: "second", body: "two\nlines", tags: [] });
  const expected = `- id: ${second.id}\n  title: "second"\n  tags: []\n- id: ${first.id}\n  title: "first: one"\n  tags: ["x", "y"]`;
  assert.equal(format(await list(db.client)), expected);
  assert.equal(await run(db.client, ["--format", "yaml"]), expected);
});
