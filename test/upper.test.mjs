import assert from "node:assert/strict";
import { test } from "node:test";
import { upper } from "../src/upper.mjs";

test("upper shouts the greeting for a name", () => {
  assert.equal(upper("Ada"), "HELLO, ADA!");
});

test("upper shouts the generic greeting for an empty name", () => {
  assert.equal(upper(""), "HELLO!");
});

test("upper replaces only the period greet adds, keeping one in the name", () => {
  assert.equal(upper("Ada."), "HELLO, ADA.!");
});
