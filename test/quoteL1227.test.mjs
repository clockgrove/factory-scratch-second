import assert from "node:assert/strict";
import { test } from "node:test";
import { quoteL1227 } from "../src/quoteL1227.mjs";

test("quoteL1227 wraps the greeting for a name in double quotes", () => {
  assert.equal(quoteL1227("Ada"), '"Hello, Ada."');
});

test("quoteL1227 wraps the generic greeting for an empty name", () => {
  assert.equal(quoteL1227(""), '"Hello."');
});
