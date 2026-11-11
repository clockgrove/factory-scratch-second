import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m111103570 prints one tab-separated line per note", async () => {
  const out = (await exporter("m111103570"))([
    { id: 1, title: "first", tags: ["a", "b"] },
    { id: 2, title: "second", tags: [] },
  ]);
  assert.equal(out, "1\tfirst\ta;b\n2\tsecond\t");
});

test("m111103570 prints an empty string for no notes", async () => {
  assert.equal((await exporter("m111103570"))([]), "");
});
