import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111007033.mjs";

test("the rule code is M111007033", () => {
  assert.equal(code, "M111007033");
});

test("a title containing the word is rejected", () => {
  assert.equal(check({ title: "before m111007033 after" }), "title contains m111007033");
});

test("the word in another case is rejected", () => {
  assert.equal(check({ title: "M111007033" }), "title contains m111007033");
});

test("a longer word containing it passes", () => {
  assert.equal(check({ title: "xm111007033 m111007033." }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
