import assert from "node:assert/strict";
import { test } from "node:test";
import { letters } from "../src/letters.mjs";

test("letters splits the greeting for a name into code points", () => {
  assert.deepEqual(letters("Ada"), ["H", "e", "l", "l", "o", ",", " ", "A", "d", "a", "."]);
});

test("letters splits the generic greeting for an empty name", () => {
  assert.deepEqual(letters(""), ["H", "e", "l", "l", "o", "."]);
});
