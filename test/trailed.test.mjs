import assert from "node:assert/strict";
import { test } from "node:test";
import { trailed } from "../src/trailed.mjs";

test("trailed ends the greeting for a name with an ellipsis", () => {
  assert.equal(trailed("Ada"), "Hello, Ada...");
});

test("trailed ends the generic greeting for an empty name with an ellipsis", () => {
  assert.equal(trailed(""), "Hello...");
});
