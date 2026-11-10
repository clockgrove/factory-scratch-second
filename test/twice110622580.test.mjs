import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110622580 } from "../src/twice110622580.mjs";

test("twice110622580 repeats the greeting twice with one space between", () => {
  assert.equal(twice110622580("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110622580 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110622580(""), "Hello. Hello.");
});
