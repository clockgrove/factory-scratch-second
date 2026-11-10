import assert from "node:assert/strict";
import { test } from "node:test";
import { length } from "../src/length.mjs";

test("length counts the characters in the greeting for a name", () => {
  assert.equal(length("Ada"), 11);
});

test("length counts the generic greeting for an empty name", () => {
  assert.equal(length(""), 6);
});
