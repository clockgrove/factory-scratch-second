import assert from "node:assert/strict";
import { test } from "node:test";
import { cube } from "../src/cube.mjs";

test("cube multiplies a positive number by itself twice", () => {
  assert.equal(cube(3), 27);
});

test("cube of a negative number is negative", () => {
  assert.equal(cube(-2), -8);
});
