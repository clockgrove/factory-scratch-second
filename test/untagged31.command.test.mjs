import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/untagged31.mjs";

const cases = {
  "--min 0": ["--min", "0"],
  "--min x": ["--min", "x"],
  "a positional argument": ["extra"],
};

for (const [name, args] of Object.entries(cases)) {
  test(`${name} is BAD_ARGS`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
