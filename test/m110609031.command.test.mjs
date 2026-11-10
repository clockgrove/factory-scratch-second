import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110609031.mjs";

test("m110609031 rejects --limit 0 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "0"]), { code: "BAD_ARGS" });
});

test("m110609031 rejects --limit -1 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "-1"]), { code: "BAD_ARGS" });
});

test("m110609031 rejects --limit 1.5 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "1.5"]), { code: "BAD_ARGS" });
});

test("m110609031 rejects --limit abc with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "abc"]), { code: "BAD_ARGS" });
});

test("m110609031 rejects --limit 1e2 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "1e2"]), { code: "BAD_ARGS" });
});

test("m110609031 rejects --limit 0x10 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "0x10"]), { code: "BAD_ARGS" });
});

test("m110609031 rejects --limit 5.0 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "5.0"]), { code: "BAD_ARGS" });
});

test("m110609031 rejects --limit ' 3 ' with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", " 3 "]), { code: "BAD_ARGS" });
});

test("m110609031 rejects a --limit beyond the safe integer range with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "99999999999999999999"]), { code: "BAD_ARGS" });
});

test("m110609031 keeps the parseArgs code for an unknown option", async () => {
  await assert.rejects(run(null, ["--lmit", "3"]), { code: "ERR_PARSE_ARGS_UNKNOWN_OPTION" });
});
