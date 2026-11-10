import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m110608363.mjs";

test("the rule code is M110608363", () => {
  assert.equal(code, "M110608363");
});

test("a 60-character title passes", () => {
  assert.equal(check({ title: "a".repeat(60) }), null);
});

test("a 61-character title is rejected", () => {
  assert.equal(
    check({ title: "a".repeat(61) }),
    "title longer than 60 characters",
  );
});

test("a missing title passes", () => {
  assert.equal(check({}), null);
});
