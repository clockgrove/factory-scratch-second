import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/show.mjs";

const cases = [
  ["a non-numeric id", ["x"]],
  ["id 0", ["0"]],
  ["a missing id", []],
];

for (const [name, args] of cases) {
  test(`show rejects ${name} with BAD_ID`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ID" });
  });
}
