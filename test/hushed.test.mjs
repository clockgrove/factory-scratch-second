import assert from "node:assert/strict";
import { test } from "node:test";
import { hushed } from "../src/hushed.mjs";

test("hushed lower-cases the greeting for a name and ends it with three periods", () => {
  assert.equal(hushed("Ada"), "hello, ada...");
});

test("hushed lower-cases the generic greeting for an empty name and ends it with three periods", () => {
  assert.equal(hushed(""), "hello...");
});
