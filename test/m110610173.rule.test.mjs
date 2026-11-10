import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m110610173.mjs";

test("the rule code is M110610173", () => {
  assert.equal(code, "M110610173");
});

test("a title with the word m110610173 is rejected", () => {
  assert.equal(check({ title: "about m110610173 today" }), "title contains m110610173");
});

test("a title with the word in capitals is rejected", () => {
  assert.equal(check({ title: "about M110610173 today" }), "title contains m110610173");
});

test("a title with a longer word containing it passes", () => {
  assert.equal(check({ title: "about xm110610173y today" }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
