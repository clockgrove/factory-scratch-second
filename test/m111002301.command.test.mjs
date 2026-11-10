import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111002301.mjs";

const cases = {
  "zero": ["--limit", "0"],
  "exponent": ["--limit", "1e1"],
  "unknown option": ["--unknown"],
  "plus sign": ["--limit", "+5"],
  "decimal point": ["--limit", "5.0"],
  "leading space": ["--limit", " 5"],
  "negative": ["--limit=-1"],
  "empty value": ["--limit="],
  "above maximum": ["--limit", "2147483648"],
  "missing value": ["--limit"],
  "positional argument": ["title"],
};

for (const [name, args] of Object.entries(cases)) {
  test(`BAD_ARGS before any query for ${name}`, async () => {
    let queries = 0;
    const client = { query() { queries += 1; throw new Error("unexpected query"); } };
    await assert.rejects(run(client, args), { code: "BAD_ARGS" });
    assert.equal(queries, 0);
  });
}

test("the default query limit is five", async () => {
  const client = { async query(sql, values) { assert.deepEqual(values, [5]); return { rows: [] }; } };
  assert.equal(await run(client, []), "");
});

test("query errors keep their original code", async () => {
  const error = Object.assign(new Error("query failed"), { code: "TEST_QUERY" });
  const client = { async query() { throw error; } };
  await assert.rejects(run(client, []), (actual) => actual === error);
});
