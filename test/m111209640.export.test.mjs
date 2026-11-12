import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111209640 is discovered as a list format", () => {
  assert.ok(formats().includes("m111209640"));
});

test("m111209640 prints the title word count per note", async () => {
  const format = await exporter("m111209640");
  assert.equal(format([{ id: 1, title: "  buy\tmilk  today\n" }, { id: 2, title: "" }]), "1\t3\n2\t0");
});

test("m111209640 counts a whitespace-only or missing title as zero words", async () => {
  const format = await exporter("m111209640");
  assert.equal(format([{ id: 3, title: "   " }, { id: 4 }]), "3\t0\n4\t0");
});

test("m111209640 of an empty list is an empty string", async () => {
  assert.equal((await exporter("m111209640"))([]), "");
});
