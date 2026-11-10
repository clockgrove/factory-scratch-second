import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111004324.mjs";

const valid = ["--tag", "work", "--embedding", "1,2,3"];
const invalid = [
  ["--embedding", "1,2,3"],
  ["--tag", "work"],
  ["--tag", "", "--embedding", "1,2,3"],
  ["--tag", "work", "--embedding", ""],
  ["--tag", "work", "--embedding", "1,2"],
  ["--tag", "work", "--embedding", "-1,2,3"],
  ["--tag", "work", "--embedding", "350000000000000000000000000000000000000,2,3"],
  ...["1,2,3,4", "1e2,2,3", "+1,2,3", ".1,2,3", "1.,2,3", " 1,2,3", "NaN,2,3", "Infinity,2,3"].map((embedding) => ["--tag", "work", "--embedding", embedding]),
  ...["0", "-1", "2147483648", "1e1", "1.0", "+1", "", " 1"].map((k) => [...valid, `--k=${k}`]),
  [...valid, "--k"],
  ["--tag"],
  ["--tag", "work", "--embedding"],
  [...valid, "--unknown", "value"],
  [...valid, "positional"],
];

for (const args of invalid) {
  test(`m111004324 rejects ${JSON.stringify(args)} before querying`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
