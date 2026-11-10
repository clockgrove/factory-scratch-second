import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110911064.mjs";

const cases = {
  "missing --tag": ["--embedding", "1,2,3"],
  "missing --embedding": ["--tag", "a"],
  "two-number embedding": ["--tag", "a", "--embedding", "1,2"],
  "ambiguous negative embedding": ["--tag", "a", "--embedding", "-1,2,3"],
  "embedding above float4 range": ["--tag", "a", "--embedding", "1,2,3.5e38"],
  "huge embedding number": ["--tag", "a", "--embedding", "1,2,400000000000000000000000000000000000000"],
  "k of zero": ["--tag", "a", "--embedding", "1,2,3", "--k", "0"],
};

for (const [name, args] of Object.entries(cases)) {
  test(`BAD_ARGS for ${name}`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
