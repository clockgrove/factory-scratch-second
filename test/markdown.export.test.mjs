import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/markdown.mjs";
import { formats } from "../src/export.mjs";

const HEAD = "| id | title | tags |\n| --- | --- | --- |";

test("markdown is discovered as an export format", () => {
  assert.ok(formats().includes("markdown"));
});

test("markdown writes a plain row under the header and delimiter", () => {
  assert.equal(format([{ id: 7, title: "plain", body: "text", tags: ["a", "b"] }]), `${HEAD}\n| 7 | plain | a, b |`);
});

test("markdown escapes a pipe in the title", () => {
  assert.equal(format([{ id: 1, title: "a|b", body: "", tags: ["x"] }]), `${HEAD}\n| 1 | a\\|b | x |`);
});

test("markdown escapes a pipe in a tag", () => {
  assert.equal(format([{ id: 4, title: "t", body: "", tags: ["x|y", "z"] }]), `${HEAD}\n| 4 | t | x\\|y, z |`);
});

test("markdown turns each line break in the title into one space", () => {
  assert.equal(format([{ id: 2, title: "one\ntwo\r\nthree\rfour", body: "", tags: [] }]), `${HEAD}\n| 2 | one two three four |  |`);
});

test("markdown turns each line break in a tag into one space", () => {
  assert.equal(format([{ id: 5, title: "t", body: "", tags: ["a\nb", "c"] }]), `${HEAD}\n| 5 | t | a b, c |`);
});

test("markdown writes an empty tags cell for a note with no tags", () => {
  assert.equal(format([{ id: 3, title: "t", body: "b", tags: [] }]), `${HEAD}\n| 3 | t |  |`);
});

test("markdown of the empty list is the header and delimiter alone", () => {
  assert.equal(format([]), HEAD);
});
