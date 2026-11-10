import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m110907183.mjs";

test("the rule code is M110907183", () => {
  assert.equal(code, "M110907183");
});

test("a title with the word m110907183 is rejected", () => {
  assert.equal(check({ title: "about m110907183 today" }), "title contains m110907183");
});

test("a title with the word in capitals is rejected", () => {
  assert.equal(check({ title: "about M110907183 today" }), "title contains m110907183");
});

test("a title with a longer word containing it passes", () => {
  assert.equal(check({ title: "about xm110907183y today" }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
