import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110705350 } from "../src/twice110705350.mjs";

test("twice110705350 repeats the greeting for a name", () => {
  assert.equal(twice110705350("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110705350 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110705350(""), "Hello. Hello.");
});
