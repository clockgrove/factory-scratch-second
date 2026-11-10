import assert from "node:assert/strict";
import { test } from "node:test";
import { doubled } from "../src/doubled.mjs";

test("doubled ends the greeting for a name with two exclamation marks", () => {
  assert.equal(doubled("Ada"), "Hello, Ada!!");
});

test("doubled ends the generic greeting for an empty name with two exclamation marks", () => {
  assert.equal(doubled(""), "Hello!!");
});
