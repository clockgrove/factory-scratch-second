import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111004320.mjs";

test("m111004320 renders two rows in input order without escaping stored text", () => {
  assert.equal(format([
    { id: 9, title: "first\ttitle", tags: ["a;b", "c d"] },
    { id: 2, title: "second", tags: [] },
  ]), "9\tfirst\ttitle\ta;b;c d\n2\tsecond\t");
});

test("m111004320 renders an empty list as an empty string", () => {
  assert.equal(format([]), "");
});
