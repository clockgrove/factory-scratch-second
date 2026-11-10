import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110923231.mjs";

for (const value of ["0", "+5", "5.0", "1e1", " 5", "", "2147483648", "9".repeat(400)]) {
  test(`m110923231 rejects --limit ${JSON.stringify(value)} before querying`, async () => {
    await assert.rejects(run(null, ["--limit", value]), { code: "BAD_ARGS" });
  });
}

for (const args of [["--limit"], ["--unknown"], ["title"]]) {
  test(`m110923231 rejects ${JSON.stringify(args)} before querying`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
