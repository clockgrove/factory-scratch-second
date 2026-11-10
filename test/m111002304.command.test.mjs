import assert from "node:assert/strict";
import { test } from "node:test";
import { command, commandNames } from "../src/commands.mjs";
import { run } from "../src/commands/m111002304.mjs";

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
  ["option instead of value", ["--tag", "--embedding", "1,2,3"]],
]) {
  test(`m111002304 rejects ${name} with BAD_ARGS before querying`, async () => {
    await assert.rejects(run(noQuery, args), { code: "BAD_ARGS" });
  });
}

for (const embedding of ["", "1,2", "1,2,3,4", "1,,3", "1e2,2,3", "+1,2,3", ".1,2,3", "1.,2,3", "NaN,2,3", "Infinity,2,3", "1, 2,3", "1,2,3\n", "1,2,3\r", "1,2,3\u2028", "3400000000000000000000000000000000000010,2,3", "-3400000000000000000000000000000000000010,2,3"]) {
  test(`m111002304 rejects embedding ${JSON.stringify(embedding)} before querying`, async () => {
    await assert.rejects(run(noQuery, ["--tag", "x", `--embedding=${embedding}`]), { code: "BAD_ARGS" });
  });
}

for (const k of ["", "0", "2147483648", "999999999999999999999", "-1", "1.5", "1e2", "+1", " 1", "1\n", "1\r", "1\u2029"]) {
  test(`m111002304 rejects k ${JSON.stringify(k)} before querying`, async () => {
    await assert.rejects(run(noQuery, [...valid, `--k=${k}`]), { code: "BAD_ARGS" });
  });
}

test("m111002304 is discovered as a notes command", async () => {
  assert.ok(commandNames().includes("m111002304"));
  assert.equal(await command("m111002304"), run);
});
