import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110700120 } from "../src/twice110700120.mjs";

test("twice110700120 repeats the named greeting", () => {
  assert.equal(twice110700120("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110700120 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110700120(""), "Hello. Hello.");
});
