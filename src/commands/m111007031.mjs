// notes m111007031 [--limit N]: the newest N titles in one line
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

const bad = (message) => Object.assign(new Error(message), { code: "BAD_ARGS" });

/** Parses args into a limit from 1 to 2147483647, throwing BAD_ARGS on anything else. */
function parseLimit(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string" } } }));
  } catch (e) {
    throw bad(e.message);
  }
  const raw = values.limit ?? "5";
  const limit = /^\d+$/.test(raw) ? Number(raw) : 0;
  if (limit < 1 || limit > 2147483647) throw bad("--limit must be a whole number from 1 to 2147483647");
  return limit;
}

export async function run(client, args) {
  const rows = await list(client, { limit: parseLimit(args) });
  return rows.map((r) => r.title).join(" | ");
}
