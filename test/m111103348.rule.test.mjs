import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111103348.mjs";

test("the rule code is M111103348", () => {
  assert.equal(code, "M111103348");
});

test("a title containing the word is rejected", () => {
  assert.equal(check({ title: "before m111103348 after" }), "title contains m111103348");
});

test("the word in another case is rejected", () => {
  assert.equal(check({ title: "M111103348" }), "title contains m111103348");
});

test("a longer word containing it passes", () => {
  assert.equal(check({ title: "xm111103348 m111103348." }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
