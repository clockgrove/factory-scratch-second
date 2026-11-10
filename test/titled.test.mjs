import assert from "node:assert/strict";
import { test } from "node:test";
import { titled } from "../src/titled.mjs";

test("titled title-cases whitespace-separated words", () => {
  assert.equal(titled("ada lovelace"), "Hello, Ada Lovelace.");
});

test("titled preserves hyphens and repeated whitespace", () => {
  assert.equal(titled("MARY-JANE   watson"), "Hello, Mary-Jane   Watson.");
});

test("titled lower-cases letters after apostrophes", () => {
  assert.equal(titled("o'NEIL"), "Hello, O'neil.");
});

test("titled upper-cases accented initial letters", () => {
  assert.equal(titled("élodie"), "Hello, Élodie.");
});

test("titled lets greet trim outer whitespace", () => {
  assert.equal(titled("  ada "), "Hello, Ada.");
});

test("titled uses the generic greeting for an empty name", () => {
  assert.equal(titled(""), "Hello.");
});

test("titled uses the generic greeting for a missing name", () => {
  assert.equal(titled(), "Hello.");
});

test("titled upper-cases an astral initial as one code point", () => {
  assert.equal(titled("𐐨x"), "Hello, 𐐀x.");
});

test("titled preserves a digit at the start of a word", () => {
  assert.equal(titled("3d"), "Hello, 3d.");
});
