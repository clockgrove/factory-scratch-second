import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";
import { commandNames } from "../src/commands.mjs";

test("formats and commands are discovered from their directories", async () => {
  assert.ok(formats().includes("json") && formats().includes("table"));
  for (const c of ["add", "list", "remove", "similar"]) assert.ok(commandNames().includes(c), `command ${c} is discovered`);
  await assert.rejects(exporter("nope"), (e) => e.code === "UNKNOWN_FORMAT");
});

test("json export is one note per line with stable keys", async () => {
  const out = (await exporter("json"))([{ id: 1, title: "t", body: "", tags: ["a"], created_at: "2026-11-06T00:00:00Z" }]);
  assert.equal(out, '{"id":1,"title":"t","body":"","tags":["a"],"created_at":"2026-11-06T00:00:00Z"}');
});
