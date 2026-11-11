// notes near54 --tag T --embedding 1,2,3 [--k N]
import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

/** A BAD_ARGS error with `message`. */
function bad(message) {
  return Object.assign(new Error(message), { code: "BAD_ARGS" });
}

/** Parses and validates the arguments, returning tag, embedding and k. */
function parse(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { tag: { type: "string" }, embedding: { type: "string" }, k: { type: "string", default: "3" } } }));
  } catch (e) {
    throw bad(e.message);
  }
  if (!values.tag) throw bad("near54 needs --tag");
  if (!values.embedding) throw bad("near54 needs --embedding");
  const parts = values.embedding.split(",");
  if (parts.length !== 3 || !parts.every((p) => /^-?\d+(\.\d+)?$/.test(p) && Math.abs(Number(p)) <= 3.4e38)) {
    throw bad("--embedding must be three numbers within the float4 range");
  }
  const k = Number(values.k);
  if (!/^\d+$/.test(values.k) || k < 1 || k > 2147483647) throw bad("--k must be an integer from 1 to 2147483647");
  return { tag: values.tag, embedding: parts.map(Number), k };
}

/** The `k` notes carrying a tag nearest to an embedding, one `#id title (distance)` line each. */
export async function run(client, args) {
  const { tag, embedding, k } = parse(args);
  const rows = await similarByTag(client, tag, embedding, k);
  return rows.map((r) => `#${r.id} ${r.title} (${Number(r.distance).toFixed(3)})`).join("\n");
}
