import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111004321.mjs";

const cases = [
  ["--limit", "0"],
  ["--limit", "1e1"],
  ["--unknown"],
  ["--limit", "+5"],
  ["--limit", "5.0"],
  ["--limit", " 5"],
  ["--limit", "-1"],
  ["--limit", ""],
  ["--limit", "2147483648"],
  ["--limit"],
  ["positional"],
];

for (const args of cases) {
  test(`m111004321 rejects ${JSON.stringify(args)} with BAD_ARGS before querying`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
