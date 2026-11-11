import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111104124.mjs";

const cases = {
  "a missing --tag": ["--embedding", "1,2,3"],
  "a missing --embedding": ["--tag", "x"],
  "a two-number embedding": ["--tag", "x", "--embedding", "1,2"],
  "a spaced negative embedding": ["--tag", "x", "--embedding", "-1,2,3"],
  "an embedding number above 3.4e38": ["--tag", "x", "--embedding", "1,2,1000000000000000000000000000000000000000"],
  "--k 0": ["--tag", "x", "--embedding", "1,2,3", "--k", "0"],
};

for (const [name, args] of Object.entries(cases)) {
  test(`${name} is BAD_ARGS`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
