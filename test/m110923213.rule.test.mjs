import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m110923213.mjs";

test("the rule code is M110923213", () => {
  assert.equal(code, "M110923213");
});

test("a title with the word m110923213 is rejected", () => {
  assert.equal(check({ title: "about m110923213 today" }), "title contains m110923213");
});

test("a title with the word in capitals is rejected", () => {
  assert.equal(check({ title: "about M110923213 today" }), "title contains m110923213");
});

test("a title with a longer word containing it passes", () => {
  assert.equal(check({ title: "about xm110923213y today" }), null);
});

test("a title with the word followed by punctuation passes", () => {
  assert.equal(check({ title: "about m110923213. today" }), null);
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
