import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111209641 is discovered as a list format", () => {
  assert.ok(formats().includes("m111209641"));
});

test("m111209641 prints the tag count per note", async () => {
  const format = await exporter("m111209641");
  assert.equal(format([{ id: 1, tags: ["a", "b"] }, { id: 2, tags: [] }]), "1\t2\n2\t0");
});

test("m111209641 counts missing tags as zero", async () => {
  assert.equal((await exporter("m111209641"))([{ id: 3 }]), "3\t0");
});

test("m111209641 of an empty list is an empty string", async () => {
  assert.equal((await exporter("m111209641"))([]), "");
});
