// notes m110909151 [--limit N]
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Lists the newest note titles, joined by " | ", up to a limit from 1 to 2147483647. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } }, allowPositionals: false, strict: true }));
  } catch (err) {
    throw Object.assign(new Error(err.message), { code: "BAD_ARGS" });
  }
  const limit = Number(values.limit);
  if (!/^\d+$/.test(values.limit) || limit < 1 || limit > 2147483647) {
    throw Object.assign(new Error("m110909151 needs --limit as an integer from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  const rows = await list(client, { limit });
  return rows.map((r) => r.title).join(" | ");
}
