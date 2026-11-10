import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/tags.mjs";

test("tags rejects --min 0 with BAD_MIN", async () => {
  await assert.rejects(run(null, ["--min", "0"]), { code: "BAD_MIN" });
});

test("tags rejects --min -1 with BAD_MIN", async () => {
  await assert.rejects(run(null, ["--min", "-1"]), { code: "BAD_MIN" });
});

test("tags rejects --min x with BAD_MIN", async () => {
  await assert.rejects(run(null, ["--min", "x"]), { code: "BAD_MIN" });
});
