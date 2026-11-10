import assert from "node:assert/strict";
import { test } from "node:test";
import { truncated } from "../src/truncated.mjs";

test("truncated preserves a greeting shorter than max", () => {
  assert.equal(truncated("Ada", 20), "Hello, Ada.");
});

test("truncated preserves a greeting exactly as long as max", () => {
  assert.equal(truncated("Ada", 11), "Hello, Ada.");
});

test("truncated replaces the cut suffix with an ellipsis", () => {
  assert.equal(truncated("Ada", 10), "Hello, Ad…");
});

test("truncated drops whitespace before the ellipsis", () => {
  assert.equal(truncated("Ada", 8), "Hello,…");
  assert.equal(truncated("A \tB", 11), "Hello, A…");
});

test("truncated returns only the ellipsis at width one", () => {
  assert.equal(truncated("Ada", 1), "…");
});

test("truncated cuts immediately after an intact emoji", () => {
  assert.equal(truncated("A😀B", 10), "Hello, A😀…");
});

test("truncated cuts immediately before an emoji", () => {
  assert.equal(truncated("A😀B", 9), "Hello, A…");
});

test("truncated counts an emoji as one code point when the greeting fits", () => {
  assert.equal(truncated("A😀B", 11), "Hello, A😀B.");
});

test("truncated preserves the generic greeting for an empty name", () => {
  assert.equal(truncated("", 6), "Hello.");
});

test("truncated preserves the generic greeting for a missing name", () => {
  assert.equal(truncated(undefined, 6), "Hello.");
});

for (const max of [0, -1, 1.5, NaN, "5", undefined, Infinity, -Infinity, null, true, 5n]) {
  test(`truncated rejects invalid max ${typeof max} ${String(max)} with RangeError`, () => {
    assert.throws(() => truncated("Ada", max), RangeError);
    assert.throws(() => truncated(undefined, max), RangeError);
    assert.throws(() => truncated({
      toString() {
        throw new Error("name must not be converted");
      },
    }, max), RangeError);
  });
}

test("truncated rejects a missing max with RangeError", () => {
  assert.throws(() => truncated("Ada"), RangeError);
  assert.throws(() => truncated(), RangeError);
});
