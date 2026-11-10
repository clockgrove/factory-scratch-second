import assert from "node:assert/strict";
import { test } from "node:test";
import { shouted } from "../src/shouted.mjs";

test("shouted returns the greeting for a name in upper case", () => {
  assert.equal(shouted("Ada"), "HELLO, ADA.");
});

test("shouted returns the generic greeting in upper case for an empty name", () => {
  assert.equal(shouted(""), "HELLO.");
});
