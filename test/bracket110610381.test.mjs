import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110610381 } from "../src/bracket110610381.mjs";

test("bracket110610381 wraps the greeting for a name in square brackets", () => {
  assert.equal(bracket110610381("Ada"), "[Hello, Ada.]");
});

test("bracket110610381 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110610381(""), "[Hello.]");
});
