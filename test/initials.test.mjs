import assert from "node:assert/strict";
import { test } from "node:test";
import { initials } from "../src/initials.mjs";

test("initials returns the initials of the greeting for a name", () => {
  assert.equal(initials("Ada"), "HA");
});

test("initials returns the initial of the generic greeting for an empty name", () => {
  assert.equal(initials(""), "H");
});
