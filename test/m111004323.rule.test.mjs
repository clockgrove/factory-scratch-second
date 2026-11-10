import assert from "node:assert/strict";
import { test } from "node:test";
import { code, check } from "../src/rules/m111004323.mjs";

test("m111004323 exports its rule code", () => {
  assert.equal(code, "M111004323");
});

test("m111004323 rejects the exact word", () => {
  assert.equal(check({ title: "m111004323" }), "title contains m111004323");
});

test("m111004323 rejects the word ignoring case", () => {
  assert.equal(check({ title: "a M111004323 note" }), "title contains m111004323");
});

test("m111004323 splits words on whitespace", () => {
  assert.equal(check({ title: "before\tm111004323\nafter" }), "title contains m111004323");
});

test("m111004323 accepts longer words containing it", () => {
  assert.equal(check({ title: "prem111004323post" }), null);
});

test("m111004323 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m111004323." }), null);
});

test("m111004323 defers missing and non-string titles", () => {
  for (const title of [undefined, null, 123, {}, []]) {
    assert.equal(check({ title }), null);
  }
  assert.equal(check({}), null);
});
