// notes m110610171 [--limit N]
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Lists the newest note titles, joined by " | ", up to a positive limit. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } }));
  } catch (err) {
    // --limit is the only option, so an invalid option value is a bad --limit; other parse errors keep their native code.
    if (err.code === "ERR_PARSE_ARGS_INVALID_OPTION_VALUE") throw Object.assign(new Error(err.message), { code: "BAD_ARGS" });
    throw err;
  }
  if (!/^[1-9]\d*$/.test(values.limit)) throw Object.assign(new Error("m110610171 needs --limit as a positive integer"), { code: "BAD_ARGS" });
  // Clamp so a huge limit stays inside Postgres bigint instead of failing with 22003.
  const rows = await list(client, { limit: Math.min(Number(values.limit), Number.MAX_SAFE_INTEGER) });
  return rows.map((r) => r.title).join(" | ");
}
