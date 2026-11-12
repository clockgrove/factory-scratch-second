import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111207511.mjs";
import { exporter, formats } from "../src/export.mjs";

test("m111207511 exports tag counts in row order with no trailing newline", () => {
  assert.equal(format([{ id: 9, tags: ["one", "two"] }, { id: 3, tags: [] }]), "9\t2\n3\t0");
});

test("m111207511 exports an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111207511 counts missing tags as zero", () => {
  assert.equal(format([{ id: 4 }]), "4\t0");
});

test("m111207511 is available through export discovery", async () => {
  assert.ok(formats().includes("m111207511"));
  assert.equal(await exporter("m111207511"), format);
});
