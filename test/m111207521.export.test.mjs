import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111207521.mjs";
import { exporter, formats } from "../src/export.mjs";

test("m111207521 exports two rows in order with one having no tags", () => {
  assert.equal(format([{ id: 8, tags: ["a", "b"] }, { id: 3, tags: [] }]), "8\t2\n3\t0");
});

test("m111207521 exports an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111207521 counts missing tags as zero", () => {
  assert.equal(format([{ id: 5 }, { id: 6, tags: null }]), "5\t0\n6\t0");
});

test("m111207521 is available through export discovery", async () => {
  assert.ok(formats().includes("m111207521"));
  assert.equal((await exporter("m111207521"))([{ id: 7, tags: ["x", "y", "z"] }]), "7\t3");
});
