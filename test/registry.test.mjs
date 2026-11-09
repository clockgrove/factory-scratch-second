import { test } from "node:test";
import assert from "node:assert/strict";
import { formats, lookup } from "../src/registry.mjs";

test("every entry has a lowercase name, a type/subtype MIME and a dotted extension", () => {
  for (const f of formats()) {
    assert.match(f.name, /^[a-z][a-z0-9-]*$/, f.name);
    assert.match(f.mime, /^[a-z]+\/[a-z0-9.+-]+$/, f.name);
    assert.match(f.extension, /^\.[a-z0-9]+$/, f.name);
  }
});

test("names are unique", () => {
  const names = formats().map((f) => f.name);
  assert.equal(new Set(names).size, names.length);
});

test("lookup returns the registered entry", () => {
  assert.deepEqual(lookup("csv"), { name: "csv", mime: "text/csv", extension: ".csv" });
});

test("lookup of an unregistered name throws UNKNOWN_FORMAT", () => {
  assert.throws(() => lookup("nope"), { code: "UNKNOWN_FORMAT" });
});
