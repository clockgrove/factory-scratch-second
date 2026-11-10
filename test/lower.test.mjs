import assert from "node:assert/strict";
import { test } from "node:test";
import { lower } from "../src/lower.mjs";

test("lower lowercases the greeting for a name and ends it with an exclamation mark", () => {
  assert.equal(lower("Ada"), "hello, ada!");
});

test("lower lowercases the generic greeting for an empty name", () => {
  assert.equal(lower(""), "hello!");
});
