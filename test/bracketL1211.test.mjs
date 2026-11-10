import assert from "node:assert/strict";
import { test } from "node:test";
import { bracketL1211 } from "../src/bracketL1211.mjs";

test("bracketL1211 wraps the greeting for a name in square brackets", () => {
  assert.equal(bracketL1211("Ada"), "[Hello, Ada.]");
});

test("bracketL1211 wraps the generic greeting for an empty name", () => {
  assert.equal(bracketL1211(""), "[Hello.]");
});
