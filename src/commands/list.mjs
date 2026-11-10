// notes list [--tag X] [--limit N] [--format json|table]
import { parseArgs } from "node:util";
import { exporter } from "../export.mjs";
import { list } from "../notes.mjs";

export async function run(client, args) {
  const { values } = parseArgs({ args, options: { tag: { type: "string" }, limit: { type: "string", default: "100" }, format: { type: "string", default: "table" } } });
  const rows = await list(client, { tag: values.tag ?? null, limit: Number(values.limit) });
  return (await exporter(values.format))(rows);
}
