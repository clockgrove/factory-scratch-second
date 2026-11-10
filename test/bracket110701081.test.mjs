import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110701081 } from "../src/bracket110701081.mjs";

test("bracket110701081 wraps the greeting for a name in square brackets", () => {
  assert.equal(bracket110701081("Ada"), "[Hello, Ada.]");
});

test("bracket110701081 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110701081(""), "[Hello.]");
});
