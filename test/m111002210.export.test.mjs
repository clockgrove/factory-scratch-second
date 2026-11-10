import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";
import { format } from "../src/export/m111002210.mjs";

test("m111002210 renders two rows in input order as tab-separated lines", () => {
  const rows = [
    { id: 5, title: "alpha", tags: ["a", "b"] },
    { id: 3, title: "beta", tags: [] },
  ];
  assert.equal(format(rows), "5\talpha\ta;b\n3\tbeta\t");
});

test("m111002210 renders an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111002210 is discovered by its file name", async () => {
  assert.ok(formats().includes("m111002210"));
  assert.equal(await exporter("m111002210"), format);
});
