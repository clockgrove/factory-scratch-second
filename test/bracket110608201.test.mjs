import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110608201 } from "../src/bracket110608201.mjs";

test("bracket110608201 wraps the greeting for a name in square brackets", () => {
  assert.equal(bracket110608201("Ada"), "[Hello, Ada.]");
});

test("bracket110608201 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110608201(""), "[Hello.]");
});
