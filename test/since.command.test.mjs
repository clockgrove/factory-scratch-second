import assert from "node:assert/strict";
import { test } from "node:test";
import { command, commandNames } from "../src/commands.mjs";
import { run } from "../src/commands/since.mjs";

const noQuery = { query() { assert.fail("invalid arguments must not query the database"); } };

for (const date of ["2026-02-30", "2026-13-01", "2026-1-05", "20260105", "2025-02-29", "1900-02-29", "", "2026-00-01", "2026-01-00", "2026-04-31", "2026-01-01T00:00:00Z", " 2026-01-01", "2026-01-01\n", "10000-01-01"]) {
  test(`since rejects date ${JSON.stringify(date)} with BAD_DATE before querying`, async () => {
    await assert.rejects(run(noQuery, ["--date", date]), { code: "BAD_DATE" });
  });
}

test("since rejects an absent --date with BAD_DATE before querying", async () => {
  await assert.rejects(run(noQuery, []), { code: "BAD_DATE" });
});

for (const limit of ["0", "2147483648", "999999999999999999999", "-1", "1.5", "1e2", "+1", " 1", "1\n", ""]) {
  test(`since rejects limit ${JSON.stringify(limit)} with BAD_ARGS before querying`, async () => {
    await assert.rejects(run(noQuery, ["--date", "2026-01-05", `--limit=${limit}`]), { code: "BAD_ARGS" });
  });
}

for (const [name, args] of [
  ["an unknown option", ["--date", "2026-01-05", "--unknown", "x"]],
  ["a positional argument", ["--date", "2026-01-05", "extra"]],
  ["a bare --date", ["--date"]],
  ["a bare --limit", ["--date", "2026-01-05", "--limit"]],
  ["a date option followed by another option", ["--date", "--limit", "1"]],
]) {
  test(`since rejects ${name} with BAD_ARGS before querying`, async () => {
    await assert.rejects(run(noQuery, args), { code: "BAD_ARGS" });
  });
}

test("since is discovered as a notes command", async () => {
  assert.ok(commandNames().includes("since"));
  assert.equal(await command("since"), run);
});
