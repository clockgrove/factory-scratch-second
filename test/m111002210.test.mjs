import { test } from "node:test";
import assert from "node:assert/strict";
import { lookup } from "../src/registry.mjs";

test("lookup returns the m111002210 entry", () => {
  assert.deepEqual(lookup("m111002210"), { name: "m111002210", mime: "text/tab-separated-values", extension: ".tsv" });
});
