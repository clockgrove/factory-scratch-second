import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111104123.mjs";

test("the rule code is M111104123", () => {
  assert.equal(code, "M111104123");
});

test("a title containing the word is rejected", () => {
  assert.equal(check({ title: "before m111104123 after" }), "title contains m111104123");
});

test("the word in another case is rejected", () => {
  assert.equal(check({ title: "M111104123" }), "title contains m111104123");
});

test("a longer word containing it passes", () => {
  assert.equal(check({ title: "xm111104123 m111104123." }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
