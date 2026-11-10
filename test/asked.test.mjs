import assert from "node:assert/strict";
import { test } from "node:test";
import { asked } from "../src/asked.mjs";

test("asked ends the greeting for a name with a question mark", () => {
  assert.equal(asked("Ada"), "Hello, Ada?");
});

test("asked ends the generic greeting for an empty name with a question mark", () => {
  assert.equal(asked(""), "Hello?");
});
