import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111003193.mjs";

test("m111003193 exports its rule code", () => {
  assert.equal(code, "M111003193");
});

test("m111003193 rejects the exact word", () => {
  assert.equal(check({ title: "m111003193" }), "title contains m111003193");
});

test("m111003193 rejects the word ignoring case", () => {
  assert.equal(check({ title: "before M111003193 after" }), "title contains m111003193");
});

test("m111003193 accepts a longer word containing it", () => {
  assert.equal(check({ title: "prem111003193post" }), null);
});

test("m111003193 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m111003193." }), null);
});

test("m111003193 defers a missing title to title-required", () => {
  assert.equal(check({}), null);
});
