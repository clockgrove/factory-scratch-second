import assert from "node:assert/strict";
import { test } from "node:test";
import { shoutCount110700412 } from "../src/shoutCount110700412.mjs";

test("shoutCount110700412 counts the letters in the greeting of a name", () => {
  assert.equal(shoutCount110700412("Ada"), 8);
});

test("shoutCount110700412 counts the letters in the generic greeting", () => {
  assert.equal(shoutCount110700412(""), 5);
});
