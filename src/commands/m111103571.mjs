// notes m111103571 [--limit N]: the newest N titles in one line, joined by " | "
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

const MAX_LIMIT = 2147483647;

/** Parse args strictly; every failure is a BAD_ARGS error. */
function parseLimit(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } }, allowPositionals: false }));
  } catch (e) {
    throw Object.assign(new Error(e.message), { code: "BAD_ARGS" });
  }
  const limit = /^\d+$/.test(values.limit) ? Number(values.limit) : NaN;
  if (!(limit >= 1 && limit <= MAX_LIMIT)) throw Object.assign(new Error(`bad --limit: ${values.limit}`), { code: "BAD_ARGS" });
  return limit;
}

export async function run(client, args) {
  const limit = parseLimit(args);
  return (await list(client, { limit })).map((r) => r.title).join(" | ");
}
