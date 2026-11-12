import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111206570 is discovered and exports two rows in order including an empty title", async () => {
  assert.ok(formats().includes("m111206570"));
  const format = await exporter("m111206570");
  assert.equal(format([{ id: 7, title: "hello" }, { id: 3, title: "" }]), "7\t5\n3\t0");
});

test("m111206570 exports an empty list as an empty string", async () => {
  assert.equal((await exporter("m111206570"))([]), "");
});

test("m111206570 gives a missing title length zero", async () => {
  assert.equal((await exporter("m111206570"))([{ id: 9 }]), "9\t0");
});

test("m111206570 counts JavaScript string length", async () => {
  assert.equal((await exporter("m111206570"))([{ id: 4, title: "a😀" }]), "4\t3");
});
