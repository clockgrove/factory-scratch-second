import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket110702241 } from "../src/bracket110702241.mjs";

test("bracket110702241 wraps the greeting of a name", () => {
  assert.equal(bracket110702241("Ada"), "[Hello, Ada.]");
});

test("bracket110702241 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket110702241(""), "[Hello.]");
});
