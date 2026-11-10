import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m110911060 prints one tab-separated line per row", async () => {
  const out = (await exporter("m110911060"))([
    { id: 1, title: "first", tags: ["a", "b"] },
    { id: 2, title: "second", tags: [] },
  ]);
  assert.equal(out, "1\tfirst\ta;b\n2\tsecond\t");
});

test("m110911060 gives an empty string for no rows", async () => {
  assert.equal((await exporter("m110911060"))([]), "");
});
