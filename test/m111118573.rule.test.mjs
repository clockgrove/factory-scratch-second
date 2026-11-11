import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111118573.mjs";

test("the rule code is M111118573", () => {
  assert.equal(code, "M111118573");
});

test("a title containing the word is rejected", () => {
  assert.equal(check({ title: "before m111118573 after" }), "title contains m111118573");
});

test("the word in another case is rejected", () => {
  assert.equal(check({ title: "M111118573" }), "title contains m111118573");
});

test("a longer word containing it passes", () => {
  assert.equal(check({ title: "xm111118573 m111118573." }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
