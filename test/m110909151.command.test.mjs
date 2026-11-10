import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110909151.mjs";

const cases = [
  ["--limit 0", ["--limit", "0"]],
  ["--limit 1e1", ["--limit", "1e1"]],
  ["an unknown option", ["--bogus"]],
  ["--limit +5", ["--limit", "+5"]],
  ["--limit 5.0", ["--limit", "5.0"]],
  ["--limit with a leading space", ["--limit", " 5"]],
  ["--limit 2147483648", ["--limit", "2147483648"]],
  ["--limit with no value", ["--limit"]],
  ["a positional argument", ["extra"]],
];

for (const [name, args] of cases) {
  test(`m110909151 rejects ${name} with BAD_ARGS`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
