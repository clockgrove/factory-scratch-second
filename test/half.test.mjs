import assert from "node:assert/strict";
import { test } from "node:test";
import { half } from "../src/half.mjs";

test("half divides a positive number by two", () => {
  assert.equal(half(10), 5);
});

test("half divides a negative number by two", () => {
  assert.equal(half(-3), -1.5);
});
