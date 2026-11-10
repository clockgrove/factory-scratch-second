// notes m111002211 [--limit N]
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Build the BAD_ARGS error. */
function badArgs(message) {
  return Object.assign(new Error(message), { code: "BAD_ARGS" });
}

/** Parse the arguments into a validated limit (1 to 2147483647, plain digits). */
function parseLimit(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } }));
  } catch (err) {
    throw badArgs(err.message);
  }
  if (!/^\d+$/.test(values.limit)) throw badArgs("--limit must be plain decimal digits");
  const limit = Number(values.limit);
  if (limit < 1 || limit > 2147483647) throw badArgs("--limit must be from 1 to 2147483647");
  return limit;
}

/** The newest `--limit` titles, newest first, joined by " | ". */
export async function run(client, args) {
  const limit = parseLimit(args);
  return (await list(client, { limit })).map((r) => r.title).join(" | ");
}
