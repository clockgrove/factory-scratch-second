import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110700121 } from "../src/bracket110700121.mjs";

test("bracket110700121 wraps the greeting of a name", () => {
  assert.equal(bracket110700121("Ada"), "[Hello, Ada.]");
});

test("bracket110700121 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110700121(""), "[Hello.]");
});
