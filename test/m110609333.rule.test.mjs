import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m110609333.mjs";

test("the rule code is M110609333", () => {
  assert.equal(code, "M110609333");
});

test("a title with the word m110609333 is rejected", () => {
  assert.equal(check({ title: "about m110609333 today" }), "title contains m110609333");
});

test("a title with the word in capitals is rejected", () => {
  assert.equal(check({ title: "about M110609333 today" }), "title contains m110609333");
});

test("a title with a longer word containing it passes", () => {
  assert.equal(check({ title: "about m110609333x today" }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
