import assert from "node:assert/strict";
import { test } from "node:test";
import { greetings } from "../src/greetings.mjs";

test("greetings returns all three forms for a name", () => {
  assert.deepEqual(greetings("Ada"), ["Hello, Ada.", "HELLO, ADA.", "hello, ada."]);
});

test("greetings falls back to the generic forms for an empty name", () => {
  assert.deepEqual(greetings(""), ["Hello.", "HELLO.", "hello."]);
});
