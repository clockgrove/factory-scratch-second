import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";
import { format } from "../src/export/ndjson.mjs";

test("ndjson renders two rows in input order and omits other fields", () => {
  const rows = [
    { id: 1, title: "first", body: "b1", tags: ["a", "b"], created_at: "2026-01-01" },
    { id: 2, title: "second", body: "b2", tags: ["c"], created_at: "2026-01-02" },
  ];
  assert.equal(
    format(rows),
    '{"id":1,"title":"first","body":"b1","tags":["a","b"]}\n{"id":2,"title":"second","body":"b2","tags":["c"]}',
  );
});

test("ndjson keeps a title with a newline and quote on a single line", () => {
  const row = { id: 5, title: 'a\n"b"', body: "x\ty", tags: ["t"] };
  const out = format([row]);
  assert.equal(out, '{"id":5,"title":"a\\n\\"b\\"","body":"x\\ty","tags":["t"]}');
  assert.deepEqual(JSON.parse(out), { id: 5, title: 'a\n"b"', body: "x\ty", tags: ["t"] });
});

test("ndjson renders a missing body as null and missing tags as an empty list", () => {
  assert.equal(format([{ id: 3, title: "t" }]), '{"id":3,"title":"t","body":null,"tags":[]}');
});

test("ndjson renders an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("ndjson is discovered by its file name", async () => {
  assert.ok(formats().includes("ndjson"));
  assert.equal(await exporter("ndjson"), format);
});
