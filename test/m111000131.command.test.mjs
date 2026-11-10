import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111000131.mjs";

const cases = [
  ["--limit 0", ["--limit", "0"]],
  ["--limit 1e1", ["--limit", "1e1"]],
  ["an unknown option", ["--bogus"]],
];

for (const [name, args] of cases) {
  test(`m111000131 rejects ${name} with BAD_ARGS`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
