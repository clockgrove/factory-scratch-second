// notes m110609034 --tag T --embedding 1,2,3 [--k N]
import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

/** Lists the notes nearest to an embedding among those carrying one tag. */
export async function run(client, args) {
  const { values } = parseArgs({ args, options: { tag: { type: "string" }, embedding: { type: "string" }, k: { type: "string", default: "3" } } });
  if (!values.tag) throw Object.assign(new Error("m110609034 needs --tag"), { code: "BAD_ARGS" });
  if (!values.embedding) throw Object.assign(new Error("m110609034 needs --embedding"), { code: "BAD_ARGS" });
  const rows = await similarByTag(client, values.tag, values.embedding.split(",").map(Number), Number(values.k));
  return rows.map((r) => `#${r.id} ${r.title} (${Number(r.distance).toFixed(3)})`).join("\n");
}
