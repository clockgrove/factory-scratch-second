import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110312190 } from "../src/twice110312190.mjs";

test("twice110312190 repeats the greeting for a name twice", () => {
  assert.equal(twice110312190("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110312190 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110312190(""), "Hello. Hello.");
});
