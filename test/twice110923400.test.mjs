import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110923400 } from "../src/twice110923400.mjs";

test("twice110923400 repeats the greeting for a name twice", () => {
  assert.equal(twice110923400("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110923400 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110923400(""), "Hello. Hello.");
});
