// notes m110622451 [--limit N]
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Lists the newest note titles, joined by " | ", up to a positive limit. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } }));
  } catch (err) {
    // Every argument mistake (bad --limit value, unknown option, stray positional) is BAD_ARGS.
    throw Object.assign(new Error(err.message), { code: "BAD_ARGS" });
  }
  if (!/^\+?\d+$/.test(values.limit) || Number(values.limit) <= 0) throw Object.assign(new Error("m110622451 needs --limit as a positive integer"), { code: "BAD_ARGS" });
  // Clamp so a huge limit stays inside Postgres bigint instead of failing with 22003.
  const rows = await list(client, { limit: Math.min(Number(values.limit), Number.MAX_SAFE_INTEGER) });
  return rows.map((r) => r.title).join(" | ");
}
