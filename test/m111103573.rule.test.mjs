import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111103573.mjs";

test("the rule code is M111103573", () => {
  assert.equal(code, "M111103573");
});

test("a title containing the word is rejected", () => {
  assert.equal(check({ title: "before m111103573 after" }), "title contains m111103573");
});

test("the word in another case is rejected", () => {
  assert.equal(check({ title: "M111103573" }), "title contains m111103573");
});

test("a longer word containing it passes", () => {
  assert.equal(check({ title: "xm111103573 m111103573." }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
