import assert from "node:assert/strict";
import { test } from "node:test";
import { twiceL1416 } from "../src/twiceL1416.mjs";

test("twiceL1416 repeats the greeting twice with one space between", () => {
  assert.equal(twiceL1416("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twiceL1416 repeats the generic greeting for an empty name", () => {
  assert.equal(twiceL1416(""), "Hello. Hello.");
});
