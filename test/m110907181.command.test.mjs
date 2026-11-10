import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110907181.mjs";

test("m110907181 rejects --limit 0 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "0"]), { code: "BAD_ARGS" });
});

test("m110907181 rejects --limit abc with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "abc"]), { code: "BAD_ARGS" });
});

test("m110907181 rejects --limit 2.5 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "2.5"]), { code: "BAD_ARGS" });
});

test("m110907181 rejects --limit -1 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "-1"]), { code: "BAD_ARGS" });
});
