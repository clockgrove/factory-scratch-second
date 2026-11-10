import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111004313.mjs";

test("m111004313 exports its rule code", () => {
  assert.equal(code, "M111004313");
});

test("m111004313 rejects the exact word", () => {
  assert.equal(check({ title: "m111004313" }), "title contains m111004313");
});

test("m111004313 rejects the word ignoring case", () => {
  assert.equal(check({ title: "before M111004313 after" }), "title contains m111004313");
});

test("m111004313 accepts a longer word containing it", () => {
  assert.equal(check({ title: "prem111004313post" }), null);
});

test("m111004313 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m111004313." }), null);
});

test("m111004313 defers a missing title to title-required", () => {
  assert.equal(check({}), null);
});
