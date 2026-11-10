import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111002214.mjs";

const cases = [
  ["a missing --tag", ["--embedding", "1,2,3"]],
  ["a missing --embedding", ["--tag", "a"]],
  ["an embedding of two numbers", ["--tag", "a", "--embedding", "1,2"]],
  ["a negative embedding without =", ["--tag", "a", "--embedding", "-1,2,3"]],
  ["an embedding number above 3.4e38", ["--tag", "a", "--embedding", `1,2,4${"0".repeat(38)}`]],
  ["--k 0", ["--tag", "a", "--embedding", "1,2,3", "--k", "0"]],
];

for (const [name, args] of cases) {
  test(`m111002214 rejects ${name} with BAD_ARGS`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
