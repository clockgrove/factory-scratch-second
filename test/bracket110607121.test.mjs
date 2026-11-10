import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110607121 } from "../src/bracket110607121.mjs";

test("bracket110607121 wraps the greeting for a name in square brackets", () => {
  assert.equal(bracket110607121("Ada"), "[Hello, Ada.]");
});

test("bracket110607121 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110607121(""), "[Hello.]");
});
