import { test } from "node:test";
import assert from "node:assert/strict";
import { lookup } from "../src/registry.mjs";

test("lookup returns the ndjson entry", () => {
  assert.deepEqual(lookup("ndjson"), { name: "ndjson", mime: "application/x-ndjson", extension: ".ndjson" });
});
