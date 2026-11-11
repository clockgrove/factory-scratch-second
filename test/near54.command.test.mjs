import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/near54.mjs";

const big = "4" + "0".repeat(38);
assert.match(big, /^-?\d+(\.\d+)?$/);
assert.ok(Number(big) > 3.4e38);

const cases = {
  "a missing --tag": ["--embedding", "1,2,3"],
  "a missing --embedding": ["--tag", "t"],
  "an embedding with two parts": ["--tag", "t", "--embedding", "1,2"],
  "an embedding with a negative first part": ["--tag", "t", "--embedding", "-1,2,3"],
  "an embedding number above 3.4e38": ["--tag", "t", "--embedding", `1,${big},1`],
  "--k 0": ["--tag", "t", "--embedding", "1,2,3", "--k", "0"],
};

for (const [name, args] of Object.entries(cases)) {
  test(`${name} is BAD_ARGS`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
