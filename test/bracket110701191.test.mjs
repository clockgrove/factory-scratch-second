import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110701191 } from "../src/bracket110701191.mjs";

test("bracket110701191 wraps the greeting of a name", () => {
  assert.equal(bracket110701191("Ada"), "[Hello, Ada.]");
});

test("bracket110701191 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110701191(""), "[Hello.]");
});
