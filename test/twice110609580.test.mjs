import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110609580 } from "../src/twice110609580.mjs";

test("twice110609580 repeats the greeting for a name twice", () => {
  assert.equal(twice110609580("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110609580 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110609580(""), "Hello. Hello.");
});
