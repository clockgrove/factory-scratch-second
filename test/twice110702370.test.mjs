import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110702370 } from "../src/twice110702370.mjs";

test("twice110702370 repeats the greeting for a name", () => {
  assert.equal(twice110702370("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110702370 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110702370(""), "Hello. Hello.");
});
