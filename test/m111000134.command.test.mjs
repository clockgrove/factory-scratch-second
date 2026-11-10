import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111000134.mjs";

const cases = {
  "missing tag": ["--embedding", "1,2,3"],
  "missing embedding": ["--tag", "a"],
  "two-number embedding": ["--tag", "a", "--embedding", "1,2"],
  "ambiguous minus embedding": ["--tag", "a", "--embedding", "-1,2,3"],
  "embedding above float4 range": ["--tag", "a", "--embedding", "1,2,4e38"],
  "huge decimal embedding": ["--tag", "a", "--embedding", "1,2,400000000000000000000000000000000000000"],
  "k zero": ["--tag", "a", "--embedding", "1,2,3", "--k", "0"],
};
for (const [name, args] of Object.entries(cases)) {
  test(`BAD_ARGS for ${name}`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
