import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111002213.mjs";

test("m111002213 exports its rule code", () => {
  assert.equal(code, "M111002213");
});

test("m111002213 rejects the exact word", () => {
  assert.equal(check({ title: "m111002213" }), "title contains m111002213");
});

test("m111002213 rejects the word ignoring case", () => {
  assert.equal(check({ title: "before M111002213 after" }), "title contains m111002213");
});

test("m111002213 accepts a longer word containing it", () => {
  assert.equal(check({ title: "prem111002213post" }), null);
});

test("m111002213 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m111002213." }), null);
});

test("m111002213 defers a missing title to title-required", () => {
  assert.equal(check({}), null);
});
