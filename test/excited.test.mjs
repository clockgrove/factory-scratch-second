import assert from "node:assert/strict";
import { test } from "node:test";
import { excited } from "../src/excited.mjs";

test("excited ends the greeting for a name with an exclamation mark", () => {
  assert.equal(excited("Ada"), "Hello, Ada!");
});

test("excited ends the generic greeting for an empty name with an exclamation mark", () => {
  assert.equal(excited(""), "Hello!");
});
