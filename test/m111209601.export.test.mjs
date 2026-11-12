import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m111209601 prints the tag count per note", async () => {
  const format = await exporter("m111209601");
  assert.equal(format([{ id: 1, tags: ["a", "b"] }, { id: 2, tags: [] }]), "1\t2\n2\t0");
});

test("m111209601 of an empty list is an empty string", async () => {
  assert.equal((await exporter("m111209601"))([]), "");
});
