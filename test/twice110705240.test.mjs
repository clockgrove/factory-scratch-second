import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110705240 } from "../src/twice110705240.mjs";

test("twice110705240 repeats the greeting for a name", () => {
  assert.equal(twice110705240("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110705240 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110705240(""), "Hello. Hello.");
});
