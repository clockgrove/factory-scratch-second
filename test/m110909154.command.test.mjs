import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110909154.mjs";

test("m110909154 rejects a missing --tag with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--embedding", "1,2,3"]), { code: "BAD_ARGS" });
});

test("m110909154 rejects a missing --embedding with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--tag", "x"]), { code: "BAD_ARGS" });
});

test("m110909154 rejects an embedding of two numbers with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--tag", "x", "--embedding", "1,2"]), { code: "BAD_ARGS" });
});

test("m110909154 rejects --embedding -1,2,3 as ambiguous with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--tag", "x", "--embedding", "-1,2,3"]), { code: "BAD_ARGS" });
});

test("m110909154 rejects an embedding number above 3.4e38 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--tag", "x", "--embedding", `1,2,4${"0".repeat(38)}`]), { code: "BAD_ARGS" });
});

test("m110909154 rejects --k 0 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--tag", "x", "--embedding", "1,2,3", "--k", "0"]), { code: "BAD_ARGS" });
});
