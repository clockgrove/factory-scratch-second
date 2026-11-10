import assert from "node:assert/strict";
import { test } from "node:test";
import { triple } from "../src/triple.mjs";

test("triple multiplies a positive number by three", () => {
  assert.equal(triple(4), 12);
});

test("triple multiplies a negative number by three", () => {
  assert.equal(triple(-2), -6);
});
