import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket111002481 } from "../src/bracket111002481.mjs";

test("bracket111002481 wraps the named greeting in brackets", () => {
  assert.equal(bracket111002481("Ada"), "[Hello, Ada.]");
});

test("bracket111002481 wraps the generic greeting when the name is empty", () => {
  assert.equal(bracket111002481(""), "[Hello.]");
});
