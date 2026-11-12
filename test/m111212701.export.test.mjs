import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111212701 is discovered", () => {
  assert.ok(formats().includes("m111212701"));
});

test("m111212701 prints id and tag count per row", async () => {
  const out = (await exporter("m111212701"))([
    { id: 1, title: "a", tags: ["x", "y"] },
    { id: 2, title: "b", tags: [] },
  ]);
  assert.equal(out, "1\t2\n2\t0");
});

test("m111212701 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111212701"))([]), "");
});
