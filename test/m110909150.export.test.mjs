import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m110909150 is discovered and prints one tab-separated line per note", async () => {
  assert.ok(formats().includes("m110909150"));
  const out = (await exporter("m110909150"))([
    { id: 1, title: "first", tags: ["a", "b"] },
    { id: 2, title: "second", tags: [] },
  ]);
  assert.equal(out, "1\tfirst\ta;b\n2\tsecond\t");
});

test("m110909150 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m110909150"))([]), "");
});
