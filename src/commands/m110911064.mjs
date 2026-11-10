// notes m110911064 --tag T --embedding 1,2,3 [--k N]
import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

const NUM = /^-?\d+(\.\d+)?$/;

/** An error with code BAD_ARGS. */
function bad(message) {
  return Object.assign(new Error(message), { code: "BAD_ARGS" });
}

/** Parses and validates the arguments into { tag, embedding, k }, throwing BAD_ARGS on any problem. */
function parse(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { tag: { type: "string" }, embedding: { type: "string" }, k: { type: "string" } } }));
  } catch (e) {
    throw bad(e.message);
  }
  if (!values.tag) throw bad("m110911064 needs a non-empty --tag");
  const parts = (values.embedding ?? "").split(",");
  if (parts.length !== 3 || !parts.every((p) => NUM.test(p) && Math.abs(Number(p)) <= 3.4e38)) throw bad("--embedding must be three numbers within float4 range");
  const kText = values.k ?? "3";
  const k = /^\d+$/.test(kText) ? Number(kText) : 0;
  if (k < 1 || k > 2147483647) throw bad("--k must be a whole number from 1 to 2147483647");
  return { tag: values.tag, embedding: parts.map(Number), k };
}

/** The `k` notes carrying a tag nearest to an embedding, one `#id title (distance)` line each. */
export async function run(client, args) {
  const { tag, embedding, k } = parse(args);
  const rows = await similarByTag(client, tag, embedding, k);
  return rows.map((r) => `#${r.id} ${r.title} (${Number(r.distance).toFixed(3)})`).join("\n");
}
