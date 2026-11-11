import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111103344.mjs";

const bad = (args) => assert.rejects(run(null, args), { code: "BAD_ARGS" });

test("m111103344 rejects a missing --tag", () => bad(["--embedding", "1,2,3"]));
test("m111103344 rejects a missing --embedding", () => bad(["--tag", "x"]));
test("m111103344 rejects a two-number embedding", () => bad(["--tag", "x", "--embedding", "1,2"]));
test("m111103344 rejects a spaced negative embedding", () => bad(["--tag", "x", "--embedding", "-1,2,3"]));
test("m111103344 rejects an embedding number above 3.4e38", () => bad(["--tag", "x", "--embedding", "1,2,4" + "0".repeat(38)]));
test("m111103344 rejects --k 0", () => bad(["--tag", "x", "--embedding", "1,2,3", "--k", "0"]));
