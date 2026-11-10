import assert from "node:assert/strict";
import { test } from "node:test";
import { greet } from "../src/greet.mjs";

test("greet names the caller and falls back to the generic form", () => {
  assert.equal(greet("Ada"), "Hello, Ada.");
  assert.equal(greet("  Ada  "), "Hello, Ada.");
  assert.equal(greet(""), "Hello.");
  assert.equal(greet(), "Hello.");
});
