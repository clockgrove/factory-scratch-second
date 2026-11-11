// notes m111103341 [--limit N]: the newest N titles in one line
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

const badArgs = (message) => Object.assign(new Error(message), { code: "BAD_ARGS" });

/** Parses args into a limit between 1 and 2147483647, or throws BAD_ARGS. */
function parseLimit(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string" } } }));
  } catch (e) {
    throw badArgs(e.message);
  }
  if (values.limit === undefined) return 5;
  const limit = /^\d+$/.test(values.limit) ? Number(values.limit) : 0;
  if (limit < 1 || limit > 2147483647) throw badArgs("--limit must be a whole number from 1 to 2147483647");
  return limit;
}

/** Returns the newest titles, newest first, joined by " | ". */
export async function run(client, args) {
  const rows = await list(client, { limit: parseLimit(args) });
  return rows.map((r) => r.title).join(" | ");
}
