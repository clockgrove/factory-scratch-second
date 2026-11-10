import assert from "node:assert/strict";
import { test } from "node:test";
import { byteLength } from "../src/byte-length.mjs";

test("byteLength counts the UTF-8 bytes of the greeting for a name", () => {
  assert.equal(byteLength("Ada"), 11);
});

test("byteLength counts the UTF-8 bytes of the generic greeting for an empty name", () => {
  assert.equal(byteLength(""), 6);
});
