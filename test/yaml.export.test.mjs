import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/yaml.mjs";
import { formats } from "../src/export.mjs";

test("yaml is discovered as an export format", () => {
  assert.ok(formats().includes("yaml"));
});

test("yaml writes one three-line item per note, with an empty tag list for none", () => {
  const rows = [
    { id: 7, title: "plain", body: "text", tags: ["a", "b"] },
    { id: 8, title: "bare", body: "", tags: [] },
  ];
  assert.equal(format(rows), '- id: 7\n  title: "plain"\n  tags: ["a", "b"]\n- id: 8\n  title: "bare"\n  tags: []');
});

test("yaml escapes a title holding a double quote and a colon", () => {
  assert.equal(format([{ id: 1, title: 'say "hi": Alice', tags: ["x"] }]), '- id: 1\n  title: "say \\"hi\\": Alice"\n  tags: ["x"]');
});

test("yaml of the empty list is an empty sequence", () => {
  assert.equal(format([]), "[]");
});
