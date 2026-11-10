import assert from "node:assert/strict";
import { test } from "node:test";
import { farewell } from "../src/farewell.mjs";

test("farewell names the caller", () => {
  assert.equal(farewell("Ada"), "Goodbye, Ada.");
});

test("farewell trims whitespace around the name", () => {
  assert.equal(farewell("  Ada  "), "Goodbye, Ada.");
});

test("farewell falls back to the generic form for empty or missing names", () => {
  assert.equal(farewell(""), "Goodbye.");
  assert.equal(farewell(), "Goodbye.");
});
