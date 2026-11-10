import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m110906563.mjs";

test("the rule code is M110906563", () => {
  assert.equal(code, "M110906563");
});

test("a title with the word m110906563 is rejected", () => {
  assert.equal(check({ title: "about m110906563 today" }), "title contains m110906563");
});

test("a title with the word in capitals is rejected", () => {
  assert.equal(check({ title: "about M110906563 today" }), "title contains m110906563");
});

test("a title with a longer word containing it passes", () => {
  assert.equal(check({ title: "about xm110906563y today" }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
