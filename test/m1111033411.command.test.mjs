import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m1111033411.mjs";

for (const args of [["--limit", "0"], ["--limit", "1e1"], ["--bogus"]]) {
  test(`m1111033411 rejects ${args.join(" ")} with BAD_ARGS`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
