import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/csv.mjs";
import { formats } from "../src/export.mjs";

test("csv is discovered as an export format", () => {
  assert.ok(formats().includes("csv"));
});

test("csv writes a plain row as is under the header", () => {
  assert.equal(format([{ id: 7, title: "plain", body: "text", tags: ["a", "b"] }]), "id,title,body,tags\n7,plain,text,a;b");
});

test("csv quotes a title holding a comma and a double quote, doubling the quote", () => {
  assert.equal(format([{ id: 1, title: 'say "hi", Alice', body: "", tags: ["x"] }]), 'id,title,body,tags\n1,"say ""hi"", Alice",,x');
});

test("csv quotes a body holding a newline", () => {
  assert.equal(format([{ id: 2, title: "t", body: "line one\nline two", tags: [] }]), 'id,title,body,tags\n2,t,"line one\nline two",');
});

test("csv writes an empty tags field for a note with no tags", () => {
  assert.equal(format([{ id: 3, title: "t", body: "b", tags: [] }]), "id,title,body,tags\n3,t,b,");
});

test("csv of the empty list is the header line alone", () => {
  assert.equal(format([]), "id,title,body,tags");
});
