import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m110911063.mjs";

test("the rule code is M110911063", () => {
  assert.equal(code, "M110911063");
});

test("a title with the word m110911063 is rejected", () => {
  assert.equal(check({ title: "about m110911063 today" }), "title contains m110911063");
});

test("a title with the word in capitals is rejected", () => {
  assert.equal(check({ title: "about M110911063 today" }), "title contains m110911063");
});

test("a title with a longer word containing it passes", () => {
  assert.equal(check({ title: "about xm110911063y today" }), null);
});

test("a title with the word followed by punctuation passes", () => {
  assert.equal(check({ title: "about m110911063. today" }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
