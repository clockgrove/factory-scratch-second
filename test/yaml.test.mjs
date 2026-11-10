import { test } from "node:test";
import assert from "node:assert/strict";
import { lookup } from "../src/registry.mjs";

test("lookup returns the yaml entry", () => {
  assert.deepEqual(lookup("yaml"), { name: "yaml", mime: "application/yaml", extension: ".yaml" });
});
