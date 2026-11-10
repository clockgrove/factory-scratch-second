import assert from "node:assert/strict";
import { test } from "node:test";
import { reverse } from "../src/reverse.mjs";

test("reverse reverses the greeting for a name", () => {
  assert.equal(reverse("Ada"), ".adA ,olleH");
});

test("reverse reverses the generic greeting for an empty name", () => {
  assert.equal(reverse(""), ".olleH");
});

test("reverse keeps astral code points intact", () => {
  assert.equal(reverse("A😀"), ".😀A ,olleH");
});
