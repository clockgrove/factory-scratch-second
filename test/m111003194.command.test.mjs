import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111003194.mjs";

const cases = {
  "a missing --tag": ["--embedding", "1,2,3"],
  "a missing --embedding": ["--tag", "x"],
  "the embedding 1,2": ["--tag", "x", "--embedding", "1,2"],
  "--embedding -1,2,3": ["--tag", "x", "--embedding", "-1,2,3"],
  "a number above 3.4e38": ["--tag", "x", "--embedding", "1,2,4e38"],
  "a huge plain number": ["--tag", "x", "--embedding", `1,2,${"9".repeat(40)}`],
  "--k 0": ["--tag", "x", "--embedding", "1,2,3", "--k", "0"],
};

for (const [name, args] of Object.entries(cases)) {
  test(`m111003194 rejects ${name} with BAD_ARGS`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
