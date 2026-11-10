import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111002300.mjs";
import { exporter, formats } from "../src/export.mjs";

test("m111002300 renders two rows in input order with literal stored values", () => {
  assert.equal(format([
    { id: 9, title: "first\ttitle", tags: ["a;b", "c\nd"] },
    { id: 2, title: "second", tags: [] },
  ]), "9\tfirst\ttitle\ta;b;c\nd\n2\tsecond\t");
});

test("m111002300 renders an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111002300 is discovered by its file name", async () => {
  assert.ok(formats().includes("m111002300"));
  assert.equal(await exporter("m111002300"), format);
});
