import assert from "node:assert/strict";
import { test } from "node:test";
import { square } from "../src/square.mjs";

test("square multiplies a positive number by itself", () => {
  assert.equal(square(5), 25);
});

test("square of a negative number is positive", () => {
  assert.equal(square(-3), 9);
});
