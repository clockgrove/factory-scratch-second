import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m110608360 format is discovered", () => {
  assert.ok(formats().includes("m110608360"));
});

test("m110608360 export is one tab-separated line per note", async () => {
  const out = (await exporter("m110608360"))([
    { id: 2, title: "second", tags: ["x", "y"] },
    { id: 1, title: "first", tags: ["x"] },
  ]);
  assert.equal(out, "2\tsecond\tx;y\n1\tfirst\tx");
});

test("m110608360 export of an empty list is empty", async () => {
  assert.equal((await exporter("m110608360"))([]), "");
});
