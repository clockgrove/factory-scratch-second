import assert from "node:assert/strict";
import { test } from "node:test";
import { compact } from "../src/compact.mjs";

test("compact removes the spaces from the greeting for a name", () => {
  assert.equal(compact("Ada"), "Hello,Ada.");
});

test("compact leaves the generic greeting for an empty name unchanged", () => {
  assert.equal(compact(""), "Hello.");
});

test("compact removes only U+0020 spaces, keeping a tab inside the name", () => {
  assert.equal(compact("Ada\tLovelace"), "Hello,Ada\tLovelace.");
});
