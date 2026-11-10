// notes similar --embedding 1,2,3 [--k N]
import { parseArgs } from "node:util";
import { similar } from "../notes.mjs";

export async function run(client, args) {
  const { values } = parseArgs({ args, options: { embedding: { type: "string" }, k: { type: "string", default: "3" } } });
  if (!values.embedding) throw Object.assign(new Error("similar needs --embedding"), { code: "BAD_ARGS" });
  const rows = await similar(client, values.embedding.split(",").map(Number), Number(values.k));
  return rows.map((r) => `#${r.id} ${r.title} (${Number(r.distance).toFixed(3)})`).join("\n");
}
