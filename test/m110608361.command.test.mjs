import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110608361.mjs";

test("m110608361 rejects a --limit that is not a positive integer with BAD_ARGS", async () => {
  for (const value of ["0", "-1", "1.5", "abc"]) {
    await assert.rejects(run(null, [`--limit=${value}`]), { code: "BAD_ARGS" }, value);
  }
});

test("m110608361 rejects a --limit beyond the safe integer range with BAD_ARGS", async () => {
  for (const value of ["9007199254740992", "9223372036854775807", "99999999999999999999", "1000000000000000000000"]) {
    await assert.rejects(run(null, [`--limit=${value}`]), { code: "BAD_ARGS" }, value);
  }
});
