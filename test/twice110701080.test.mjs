import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110701080 } from "../src/twice110701080.mjs";

test("twice110701080 repeats the greeting twice with one space between", () => {
  assert.equal(twice110701080("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110701080 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110701080(""), "Hello. Hello.");
});
