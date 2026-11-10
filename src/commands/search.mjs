import { parseArgs } from "node:util";
import { search } from "../notes.mjs";

/** Print notes whose title or body contains --q, newest first, with optional tag and limit. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { q: { type: "string" }, tag: { type: "string" }, limit: { type: "string", default: "20" } }, allowPositionals: false, strict: true }));
  } catch {
    throw Object.assign(new Error("search needs --q TEXT and optional --tag TEXT and --limit N"), { code: "BAD_ARGS" });
  }
  const limit = Number(values.limit);
  if (!values.q || !/^\d+$/.test(values.limit) || !Number.isInteger(limit) || limit < 1 || limit > 2147483647) {
    throw Object.assign(new Error("search needs nonempty --q and --limit from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  return (await search(client, { q: values.q, tag: values.tag, limit })).map((row) => `#${row.id} ${row.title}`).join("\n");
}
