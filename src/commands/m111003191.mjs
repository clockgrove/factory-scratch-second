// notes m111003191 [--limit N]: the newest N titles in one line
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Parses args into a validated limit, throwing BAD_ARGS for anything outside the limit rule. */
function parseLimit(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } }));
  } catch (cause) {
    throw Object.assign(new Error(cause.message), { code: "BAD_ARGS" });
  }
  const limit = /^\d+$/.test(values.limit) ? Number(values.limit) : 0;
  if (limit < 1 || limit > 2147483647) throw Object.assign(new Error("--limit must be 1 to 2147483647"), { code: "BAD_ARGS" });
  return limit;
}

export async function run(client, args) {
  const rows = await list(client, { limit: parseLimit(args) });
  return rows.map((r) => r.title).join(" | ");
}
