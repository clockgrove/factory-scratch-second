import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m1111033410 prints one tab-separated line per row", async () => {
  const fmt = await exporter("m1111033410");
  const out = fmt([{ id: 2, title: "b", tags: ["x", "y"] }, { id: 1, title: "a", tags: [] }]);
  assert.equal(out, "2\tb\tx;y\n1\ta\t");
});

test("m1111033410 gives an empty string for no rows", async () => {
  assert.equal((await exporter("m1111033410"))([]), "");
});
