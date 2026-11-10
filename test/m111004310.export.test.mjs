import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111004310 is discovered", () => {
  assert.ok(formats().includes("m111004310"));
});

test("m111004310 prints one tab-separated line per note without a trailing newline", async () => {
  const format = await exporter("m111004310");
  const out = format([{ id: 1, title: "first", tags: ["a", "b"] }, { id: 2, title: "second", tags: [] }]);
  assert.equal(out, "1\tfirst\ta;b\n2\tsecond\t");
});

test("m111004310 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111004310"))([]), "");
});
