import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110607120 } from "../src/twice110607120.mjs";

test("twice110607120 repeats the greeting for a name twice", () => {
  assert.equal(twice110607120("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110607120 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110607120(""), "Hello. Hello.");
});
