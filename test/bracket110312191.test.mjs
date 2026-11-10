import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110312191 } from "../src/bracket110312191.mjs";

test("bracket110312191 wraps the greeting for a name in square brackets", () => {
  assert.equal(bracket110312191("Ada"), "[Hello, Ada.]");
});

test("bracket110312191 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110312191(""), "[Hello.]");
});
