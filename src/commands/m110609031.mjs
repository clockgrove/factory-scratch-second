// notes m110609031 [--limit N]: the newest titles in one line.
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Reads --limit from args, turning an invalid --limit value (such as `--limit -1`) into BAD_ARGS. */
function parseLimit(args) {
  try {
    return parseArgs({ args, options: { limit: { type: "string", default: "5" } } }).values.limit;
  } catch (err) {
    if (err.code !== "ERR_PARSE_ARGS_INVALID_OPTION_VALUE") throw err;
    throw Object.assign(new Error(`m110609031: ${err.message}`), { code: "BAD_ARGS" });
  }
}

/** Returns the newest N note titles joined by " | ", accepting only decimal-digit safe integers above 0 as --limit. */
export async function run(client, args) {
  const value = parseLimit(args);
  const n = Number(value);
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(n)) {
    throw Object.assign(new Error("m110609031 needs --limit to be a positive integer"), { code: "BAD_ARGS" });
  }
  const rows = await list(client, { limit: n });
  return rows.map((r) => r.title).join(" | ");
}
