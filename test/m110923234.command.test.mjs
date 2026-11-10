import assert from "node:assert/strict";
import { test } from "node:test";
import { command, commandNames } from "../src/commands.mjs";
import { run } from "../src/commands/m110923234.mjs";

const noQuery = { query() { assert.fail("invalid arguments must not query the database"); } };
const valid = ["--tag", "x", "--embedding", "1,2,3"];

for (const [name, args] of [
  ["missing tag", ["--embedding", "1,2,3"]],
  ["empty tag", ["--tag=", "--embedding", "1,2,3"]],
  ["missing embedding", ["--tag", "x"]],
  ["ambiguous negative embedding", ["--tag", "x", "--embedding", "-1,2,3"]],
  ["bare tag", ["--tag"]],
  ["bare embedding", ["--tag", "x", "--embedding"]],
  ["bare k", [...valid, "--k"]],
  ["unknown option", [...valid, "--unknown", "x"]],
  ["positional argument", [...valid, "extra"]],
  ["option as value", ["--tag", "--embedding", "1,2,3"]],
]) {
  test(`m110923234 rejects ${name} with BAD_ARGS before querying`, async () => {
    await assert.rejects(run(noQuery, args), { code: "BAD_ARGS" });
  });
}

for (const embedding of ["", "1,2", "1,2,3,4", "1,,3", "NaN,2,3", "Infinity,2,3", "1e2,2,3", "+1,2,3", ".1,2,3", "1.,2,3", " 1,2,3", "1,2,3\n", "3400000000000000000000000000000000000010,2,3", "-3400000000000000000000000000000000000010,2,3"]) {
  test(`m110923234 rejects embedding ${JSON.stringify(embedding)} before querying`, async () => {
    await assert.rejects(run(noQuery, ["--tag", "x", `--embedding=${embedding}`]), { code: "BAD_ARGS" });
  });
}

for (const k of ["", "0", "2147483648", "-1", "1.5", "1e2", "+1", " 1", "1\n"]) {
  test(`m110923234 rejects k ${JSON.stringify(k)} before querying`, async () => {
    await assert.rejects(run(noQuery, [...valid, `--k=${k}`]), { code: "BAD_ARGS" });
  });
}

test("m110923234 is discovered as a notes command", async () => {
  assert.ok(commandNames().includes("m110923234"));
  assert.equal(await command("m110923234"), run);
});
