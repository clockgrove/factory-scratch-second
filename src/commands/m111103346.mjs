// notes m111103346 [--limit N]: the newest N titles in one line
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

const bad = (message) => Object.assign(new Error(message), { code: "BAD_ARGS" });

/** Parses the arguments and returns the validated limit, throwing BAD_ARGS on any misuse. */
function parseLimit(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } }));
  } catch (e) {
    throw bad(e.message);
  }
  const limit = values.limit;
  if (!/^\d+$/.test(limit) || Number(limit) < 1 || Number(limit) > 2147483647) throw bad("--limit must be a whole number from 1 to 2147483647");
  return Number(limit);
}

export async function run(client, args) {
  const rows = await list(client, { limit: parseLimit(args) });
  return rows.map((r) => r.title).join(" | ");
}
