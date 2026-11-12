import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111207520.mjs";
import { exporter, formats } from "../src/export.mjs";

test("m111207520 exports two rows in order with an empty title", () => {
  assert.equal(format([{ id: 8, title: "two words" }, { id: 3, title: "" }]), "8\t2\n3\t0");
});

test("m111207520 exports an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111207520 counts maximal non-whitespace runs", () => {
  assert.equal(format([{ id: 4, title: " \talpha\nbeta gamma-delta  " }]), "4\t3");
});

test("m111207520 counts missing and whitespace-only titles as zero", () => {
  assert.equal(format([{ id: 5 }, { id: 6, title: " \t\n " }]), "5\t0\n6\t0");
});

test("m111207520 is available through export discovery", async () => {
  assert.ok(formats().includes("m111207520"));
  assert.equal((await exporter("m111207520"))([{ id: 7, title: "found words" }]), "7\t2");
});
