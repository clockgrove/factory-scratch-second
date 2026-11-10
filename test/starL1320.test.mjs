import assert from "node:assert/strict";
import { test } from "node:test";
import { starL1320 } from "../src/starL1320.mjs";

test("starL1320 replaces the space in the greeting with an asterisk", () => {
  assert.equal(starL1320("Ada"), "Hello,*Ada.");
});

test("starL1320 returns Hello. for an empty name", () => {
  assert.equal(starL1320(""), "Hello.");
});
