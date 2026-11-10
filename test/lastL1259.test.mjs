import assert from "node:assert/strict";
import { test } from "node:test";
import { lastL1259 } from "../src/lastL1259.mjs";

test("lastL1259 returns the name without its trailing period", () => {
  assert.equal(lastL1259("Ada"), "Ada");
});

test("lastL1259 returns Hello for an empty name", () => {
  assert.equal(lastL1259(""), "Hello");
});
