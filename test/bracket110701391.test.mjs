import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110701391 } from "../src/bracket110701391.mjs";

test("bracket110701391 wraps the greeting of a name", () => {
  assert.equal(bracket110701391("Ada"), "[Hello, Ada.]");
});

test("bracket110701391 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110701391(""), "[Hello.]");
});
