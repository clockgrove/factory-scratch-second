import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110906561.mjs";

test("m110906561 rejects --limit 0 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "0"]), { code: "BAD_ARGS" });
});

test("m110906561 rejects --limit -1 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit=-1"]), { code: "BAD_ARGS" });
});

test("m110906561 rejects --limit 2.5 with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "2.5"]), { code: "BAD_ARGS" });
});

test("m110906561 rejects --limit abc with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "abc"]), { code: "BAD_ARGS" });
});

test("m110906561 rejects a bare --limit with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit"]), { code: "BAD_ARGS" });
});

test("m110906561 rejects an unknown option with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--lmit", "3"]), { code: "BAD_ARGS" });
});

test("m110906561 rejects a bare positional number with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["3"]), { code: "BAD_ARGS" });
});

test("m110906561 accepts --limit 05 as five", async () => {
  let params;
  const client = { query: async (_sql, p) => { params = p; return { rows: [] }; } };
  await run(client, ["--limit", "05"]);
  assert.deepEqual(params, [5]);
});

test("m110906561 accepts --limit +5 as five", async () => {
  let params;
  const client = { query: async (_sql, p) => { params = p; return { rows: [] }; } };
  await run(client, ["--limit", "+5"]);
  assert.deepEqual(params, [5]);
});

// Fake-only: a stub client records the LIMIT parameter, since the db test holds only three notes.
test("m110906561 asks list() for 5 rows by default", async () => {
  let params;
  const client = { query: async (_sql, p) => { params = p; return { rows: [] }; } };
  await run(client, []);
  assert.deepEqual(params, [5]);
});
