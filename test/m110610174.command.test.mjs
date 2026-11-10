import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110610174.mjs";

test("m110610174 rejects a missing --tag with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--embedding", "1,2,3"]), { code: "BAD_ARGS" });
});

test("m110610174 rejects a missing --embedding with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--tag", "t"]), { code: "BAD_ARGS" });
});
