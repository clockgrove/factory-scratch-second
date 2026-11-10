import assert from "node:assert/strict";
import { test } from "node:test";
import { spaced } from "../src/spaced.mjs";

test("spaced puts one space between every two characters of the greeting", () => {
  assert.equal(spaced("Ada"), "H e l l o ,   A d a .");
});

test("spaced spaces the generic form for an empty name", () => {
  assert.equal(spaced(""), "H e l l o .");
});
