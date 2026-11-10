import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110607291 } from "../src/bracket110607291.mjs";

test("bracket110607291 wraps the greeting for a name in square brackets", () => {
  assert.equal(bracket110607291("Ada"), "[Hello, Ada.]");
});

test("bracket110607291 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110607291(""), "[Hello.]");
});
