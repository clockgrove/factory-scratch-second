import assert from "node:assert/strict";
import { test } from "node:test";
import { twice111002480 } from "../src/twice111002480.mjs";

test("twice111002480 repeats the greeting for a name twice", () => {
  assert.equal(twice111002480("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice111002480 repeats the generic greeting for an empty name", () => {
  assert.equal(twice111002480(""), "Hello. Hello.");
});
