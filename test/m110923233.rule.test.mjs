import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m110923233.mjs";

test("m110923233 exports its rule code", () => {
  assert.equal(code, "M110923233");
});

test("m110923233 rejects the exact word", () => {
  assert.equal(check({ title: "m110923233" }), "title contains m110923233");
});

test("m110923233 rejects the word ignoring case", () => {
  assert.equal(check({ title: "before M110923233 after" }), "title contains m110923233");
});

test("m110923233 splits words on whitespace", () => {
  assert.equal(check({ title: "before\tm110923233\nafter" }), "title contains m110923233");
});

test("m110923233 accepts a longer word containing it", () => {
  assert.equal(check({ title: "prem110923233post" }), null);
});

test("m110923233 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m110923233." }), null);
});

test("m110923233 defers a missing title to title-required", () => {
  assert.equal(check({}), null);
});

test("m110923233 defers non-string titles to title-required", () => {
  for (const title of [null, 123, false, {}]) assert.equal(check({ title }), null);
});
