import assert from "node:assert/strict";
import { test } from "node:test";
import { whisper } from "../src/whisper.mjs";

test("whisper names the caller in lower case", () => {
  assert.equal(whisper("Ada"), "hello, ada.");
});

test("whisper falls back to the generic form for an empty name", () => {
  assert.equal(whisper(""), "hello.");
});
