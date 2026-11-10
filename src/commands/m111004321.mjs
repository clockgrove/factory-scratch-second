import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Returns the newest note titles joined by a spaced vertical bar. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } }, allowPositionals: false }));
  } catch (error) {
    throw Object.assign(new Error(error.message), { code: "BAD_ARGS" });
  }
  const limit = Number(values.limit);
  if (!/^\d+$/.test(values.limit) || limit < 1 || limit > 2147483647) {
    throw Object.assign(new Error("--limit must be decimal digits from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  const rows = await list(client, { limit });
  return rows.map((row) => row.title).join(" | ");
}
