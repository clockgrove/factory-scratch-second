import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110610380 } from "../src/twice110610380.mjs";

test("twice110610380 repeats the greeting for a name twice", () => {
  assert.equal(twice110610380("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110610380 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110610380(""), "Hello. Hello.");
});
