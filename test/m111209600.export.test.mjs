import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m111209600 prints the title word count per note", async () => {
  const format = await exporter("m111209600");
  assert.equal(format([{ id: 1, title: "  buy  milk today " }, { id: 2, title: "" }]), "1\t3\n2\t0");
});

test("m111209600 of an empty list is an empty string", async () => {
  assert.equal((await exporter("m111209600"))([]), "");
});
