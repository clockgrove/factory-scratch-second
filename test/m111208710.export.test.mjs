import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111208710 is discovered as a format", () => {
  assert.ok(formats().includes("m111208710"));
});

test("m111208710 prints id, tab and title length per row", async () => {
  const format = await exporter("m111208710");
  assert.equal(format([{ id: 1, title: "hello" }, { id: 2, title: "" }]), "1\t5\n2\t0");
});

test("m111208710 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111208710"))([]), "");
});
