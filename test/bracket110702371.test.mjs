import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110702371 } from "../src/bracket110702371.mjs";

test("bracket110702371 wraps the greeting of a name", () => {
  assert.equal(bracket110702371("Ada"), "[Hello, Ada.]");
});

test("bracket110702371 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110702371(""), "[Hello.]");
});
