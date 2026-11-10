import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110702240 } from "../src/twice110702240.mjs";

test("twice110702240 repeats the greeting for a name", () => {
  assert.equal(twice110702240("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110702240 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110702240(""), "Hello. Hello.");
});
