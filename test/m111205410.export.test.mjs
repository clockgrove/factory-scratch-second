import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111205410 is discovered and exports ordered IDs and tag counts", async () => {
  assert.ok(formats().includes("m111205410"));
  const format = await exporter("m111205410");
  assert.equal(format([{ id: 7, tags: ["a", "b"] }, { id: 3, tags: [] }]), "7\t2\n3\t0");
});

test("m111205410 exports an empty list as an empty string", async () => {
  const format = await exporter("m111205410");
  assert.equal(format([]), "");
});
