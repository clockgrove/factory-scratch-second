import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m111103340 prints id, title and semicolon-joined tags per line", async () => {
  const out = (await exporter("m111103340"))([
    { id: 2, title: "second", tags: ["a", "b"] },
    { id: 1, title: "first", tags: [] },
  ]);
  assert.equal(out, "2\tsecond\ta;b\n1\tfirst\t");
});

test("m111103340 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111103340"))([]), "");
});
