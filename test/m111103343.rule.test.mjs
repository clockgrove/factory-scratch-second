import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111103343.mjs";

test("the rule code is M111103343", () => {
  assert.equal(code, "M111103343");
});

test("a title containing the word is rejected", () => {
  assert.equal(check({ title: "before m111103343 after" }), "title contains m111103343");
});

test("the word in another case is rejected", () => {
  assert.equal(check({ title: "M111103343" }), "title contains m111103343");
});

test("a longer word containing it passes", () => {
  assert.equal(check({ title: "xm111103343 m111103343." }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
