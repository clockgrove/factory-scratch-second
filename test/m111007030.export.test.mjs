import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111007030 is discovered and prints one tab-separated line per row", async () => {
  assert.ok(formats().includes("m111007030"));
  const out = (await exporter("m111007030"))([
    { id: 1, title: "first", tags: ["a", "b"] },
    { id: 2, title: "second", tags: [] },
  ]);
  assert.equal(out, "1\tfirst\ta;b\n2\tsecond\t");
});

test("m111007030 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111007030"))([]), "");
});
