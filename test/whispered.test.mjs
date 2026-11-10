import assert from "node:assert/strict";
import { test } from "node:test";
import { whispered } from "../src/whispered.mjs";

test("whispered returns the greeting for a name in lower case", () => {
  assert.equal(whispered("Ada"), "hello, ada.");
});

test("whispered returns the generic greeting for an empty name", () => {
  assert.equal(whispered(""), "hello.");
});
