import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110700411 } from "../src/bracket110700411.mjs";

test("bracket110700411 wraps a named greeting", () => {
  assert.equal(bracket110700411("Ada"), "[Hello, Ada.]");
});

test("bracket110700411 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110700411(""), "[Hello.]");
});
