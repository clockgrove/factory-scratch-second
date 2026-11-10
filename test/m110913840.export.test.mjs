import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";
import { format } from "../src/export/m110913840.mjs";

test("m110913840 renders two rows in input order without escaping stored text", () => {
  const rows = [
    { id: 7, title: "first\tstored", tags: ["a;b", " spaced "] },
    { id: 2, title: "second", tags: [] },
  ];
  assert.equal(format(rows), "7\tfirst\tstored\ta;b; spaced \n2\tsecond\t");
});

test("m110913840 renders an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m110913840 is discovered by its file name", async () => {
  assert.ok(formats().includes("m110913840"));
  assert.equal(await exporter("m110913840"), format);
});
