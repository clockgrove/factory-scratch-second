import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110701190 } from "../src/twice110701190.mjs";

test("twice110701190 repeats the greeting for a name", () => {
  assert.equal(twice110701190("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110701190 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110701190(""), "Hello. Hello.");
});
