import assert from "node:assert/strict";
import { test } from "node:test";
import { twice110607290 } from "../src/twice110607290.mjs";

test("twice110607290 repeats the greeting for a name twice", () => {
  assert.equal(twice110607290("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice110607290 repeats the generic greeting for an empty name", () => {
  assert.equal(twice110607290(""), "Hello. Hello.");
});
