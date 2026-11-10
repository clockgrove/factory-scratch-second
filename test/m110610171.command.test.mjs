import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110610171.mjs";

test("m110610171 rejects --limit 0 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "0"]), { code: "BAD_ARGS" });
});

test("m110610171 rejects --limit -1 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit=-1"]), { code: "BAD_ARGS" });
});

test("m110610171 rejects --limit 2.5 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "2.5"]), { code: "BAD_ARGS" });
});

test("m110610171 rejects --limit abc with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "abc"]), { code: "BAD_ARGS" });
});

test("m110610171 rejects a bare --limit with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit"]), { code: "BAD_ARGS" });
});

// Fake-only: a stub client records the LIMIT parameter, since the db test holds only three notes.
test("m110610171 asks list() for 5 rows by default", async () => {
  let params;
  const client = { query: async (_sql, p) => { params = p; return { rows: [] }; } };
  await run(client, []);
  assert.deepEqual(params, [5]);
});
