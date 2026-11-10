import { test } from "node:test";
import assert from "node:assert/strict";
import { formats, lookup } from "../src/registry.mjs";

test("lookup returns the m111002300 entry", () => {
  assert.deepEqual(lookup("m111002300"), { name: "m111002300", mime: "text/tab-separated-values", extension: ".tsv" });
});

test("registry names remain sorted", () => {
  const names = formats().map((entry) => entry.name);
  assert.deepEqual(names, [...names].sort());
});
