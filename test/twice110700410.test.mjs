import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110700410 } from "../src/twice110700410.mjs";

test("twice110700410 repeats the named greeting", () => {
  assert.equal(twice110700410("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110700410 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110700410(""), "Hello. Hello.");
});
