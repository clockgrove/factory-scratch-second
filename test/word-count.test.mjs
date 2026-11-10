import assert from "node:assert/strict";
import { test } from "node:test";
import { wordCount } from "../src/word-count.mjs";

test("wordCount counts the words in the greeting for a name", () => {
  assert.equal(wordCount("Ada"), 2);
});

test("wordCount counts the generic greeting for an empty name", () => {
  assert.equal(wordCount(""), 1);
});
