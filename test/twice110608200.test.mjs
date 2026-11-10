import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110608200 } from "../src/twice110608200.mjs";

test("twice110608200 repeats the greeting for a name twice", () => {
  assert.equal(twice110608200("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110608200 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110608200(""), "Hello. Hello.");
});
