import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m110909153.mjs";

test("the rule code is M110909153", () => {
  assert.equal(code, "M110909153");
});

test("a title with the word m110909153 is rejected", () => {
  assert.equal(check({ title: "about m110909153 today" }), "title contains m110909153");
});

test("a title with the word in capitals is rejected", () => {
  assert.equal(check({ title: "about M110909153 today" }), "title contains m110909153");
});

test("a title with a longer word containing it passes", () => {
  assert.equal(check({ title: "about xm110909153y today" }), null);
});

test("a title with the word followed by punctuation passes", () => {
  assert.equal(check({ title: "about m110909153. today" }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
