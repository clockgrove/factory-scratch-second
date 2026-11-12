import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111212700 is discovered", () => {
  assert.ok(formats().includes("m111212700"));
});

test("m111212700 prints id and title word count per row", async () => {
  const out = (await exporter("m111212700"))([
    { id: 1, title: "  hello   big world ", tags: [] },
    { id: 2, title: "", tags: [] },
  ]);
  assert.equal(out, "1\t3\n2\t0");
});

test("m111212700 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111212700"))([]), "");
});
