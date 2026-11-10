import assert from "node:assert/strict";
import { test } from "node:test";
import { shout } from "../src/shout.mjs";

test("shout names the caller in upper case", () => {
  assert.equal(shout("Ada"), "HELLO, ADA.");
});

test("shout falls back to the generic form for an empty name", () => {
  assert.equal(shout(""), "HELLO.");
});
