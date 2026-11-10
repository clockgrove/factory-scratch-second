// notes m110608361 [--limit N]: the newest titles in one line.
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Returns the newest note titles joined by " | ", validating --limit before touching the store. */
export async function run(client, args) {
  const { values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } });
  if (!/^[1-9]\d*$/.test(values.limit) || !Number.isSafeInteger(Number(values.limit))) {
    throw Object.assign(new Error("m110608361 needs --limit to be a positive integer"), { code: "BAD_ARGS" });
  }
  const rows = await list(client, { limit: Number(values.limit) });
  return rows.map((r) => r.title).join(" | ");
}
