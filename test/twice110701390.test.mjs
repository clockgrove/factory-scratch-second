import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110701390 } from "../src/twice110701390.mjs";

test("twice110701390 repeats the greeting for a name", () => {
  assert.equal(twice110701390("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110701390 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110701390(""), "Hello. Hello.");
});
