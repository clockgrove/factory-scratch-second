import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110923401 } from "../src/bracket110923401.mjs";

test("bracket110923401 wraps the greeting of a name", () => {
  assert.equal(bracket110923401("Ada"), "[Hello, Ada.]");
});

test("bracket110923401 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110923401(""), "[Hello.]");
});
