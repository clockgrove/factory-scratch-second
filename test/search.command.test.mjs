import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/search.mjs";
import { command, commandNames } from "../src/commands.mjs";

const invalid = [
  ["missing --q", []],
  ["empty --q", ["--q", ""]],
  ["zero limit", ["--q", "x", "--limit", "0"]],
  ["exponent limit", ["--q", "x", "--limit", "1e1"]],
  ["unknown option", ["--q", "x", "--unknown", "x"]],
  ["negative limit", ["--q", "x", "--limit=-1"]],
  ["fractional limit", ["--q", "x", "--limit", "1.5"]],
  ["signed limit", ["--q", "x", "--limit", "+1"]],
  ["empty limit", ["--q", "x", "--limit", ""]],
  ["whitespace limit", ["--q", "x", "--limit", " 1"]],
  ["limit above maximum", ["--q", "x", "--limit", "2147483648"]],
  ["huge limit", ["--q", "x", "--limit", "999999999999999999999999"]],
  ["missing q value", ["--q"]],
  ["missing tag value", ["--q", "x", "--tag"]],
  ["missing limit value", ["--q", "x", "--limit"]],
  ["positional argument", ["--q", "x", "extra"]],
];

for (const [name, args] of invalid) {
  test(`search rejects ${name} with BAD_ARGS before querying`, async () => {
    let queries = 0;
    const client = { query() { queries++; throw new Error("unexpected query"); } };
    await assert.rejects(run(client, args), { code: "BAD_ARGS" });
    assert.equal(queries, 0);
  });
}

test("search is discovered as a notes command", async () => {
  assert.ok(commandNames().includes("search"));
  assert.equal(await command("search"), run);
});
