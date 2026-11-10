import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111002303.mjs";

test("m111002303 exports its rule code", () => {
  assert.equal(code, "M111002303");
});

test("m111002303 rejects the exact word", () => {
  assert.equal(check({ title: "m111002303" }), "title contains m111002303");
});

test("m111002303 rejects the word ignoring case", () => {
  assert.equal(check({ title: "before M111002303 after" }), "title contains m111002303");
});

test("m111002303 accepts a longer word containing it", () => {
  assert.equal(check({ title: "prem111002303post" }), null);
});

test("m111002303 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m111002303." }), null);
});

test("m111002303 defers a missing title to title-required", () => {
  assert.equal(check({}), null);
});

test("m111002303 separates words on tabs and newlines", () => {
  assert.equal(check({ title: "before\tM111002303\nafter" }), "title contains m111002303");
});

test("m111002303 defers non-string titles to title-required", () => {
  for (const title of [null, 42, false, {}]) {
    assert.equal(check({ title }), null);
  }
});
