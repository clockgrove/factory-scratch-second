import { test } from "node:test";
import assert from "node:assert/strict";
import { lookup } from "../src/registry.mjs";

test("lookup returns the m111003190 entry", () => {
  assert.deepEqual(lookup("m111003190"), { name: "m111003190", mime: "text/tab-separated-values", extension: ".tsv" });
});
