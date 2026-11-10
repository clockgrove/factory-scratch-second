import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110609581 } from "../src/bracket110609581.mjs";

test("bracket110609581 wraps the greeting for a name in square brackets", () => {
  assert.equal(bracket110609581("Ada"), "[Hello, Ada.]");
});

test("bracket110609581 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110609581(""), "[Hello.]");
});
