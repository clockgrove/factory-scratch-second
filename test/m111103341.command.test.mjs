import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111103341.mjs";

for (const args of [["--limit", "0"], ["--limit", "1e1"], ["--nope"]]) {
  test(`m111103341 rejects ${args.join(" ")} with BAD_ARGS before any query`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
