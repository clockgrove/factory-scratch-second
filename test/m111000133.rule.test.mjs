import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111000133.mjs";

test("m111000133 exports its rule code", () => {
  assert.equal(code, "M111000133");
});

test("m111000133 rejects the exact word", () => {
  assert.equal(check({ title: "m111000133" }), "title contains m111000133");
});

test("m111000133 rejects the word ignoring case", () => {
  assert.equal(check({ title: "before M111000133 after" }), "title contains m111000133");
});

test("m111000133 accepts a longer word containing it", () => {
  assert.equal(check({ title: "prem111000133post" }), null);
});

test("m111000133 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m111000133." }), null);
});

test("m111000133 defers a missing title to title-required", () => {
  assert.equal(check({}), null);
});
