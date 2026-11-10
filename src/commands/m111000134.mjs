// notes m111000134 --tag T --embedding 1,2,3 [--k N]
import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

const NUM = /^-?\d+(\.\d+)?$/;

/** Throws a BAD_ARGS error with the given message. */
function bad(message) {
  return Object.assign(new Error(message), { code: "BAD_ARGS" });
}

/** Parses the arguments into `{ tag, embedding, k }` or throws BAD_ARGS. */
function parse(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { tag: { type: "string" }, embedding: { type: "string" }, k: { type: "string" } }, allowPositionals: false }));
  } catch (e) {
    throw bad(e.message);
  }
  if (!values.tag) throw bad("m111000134 needs --tag");
  if (!values.embedding) throw bad("m111000134 needs --embedding");
  const parts = values.embedding.split(",");
  if (parts.length !== 3 || !parts.every((p) => NUM.test(p) && Math.abs(Number(p)) <= 3.4e38)) throw bad("--embedding must be three numbers within the float4 range");
  const kText = values.k ?? "3";
  if (!/^\d+$/.test(kText) || Number(kText) < 1 || Number(kText) > 2147483647) throw bad("--k must be an integer from 1 to 2147483647");
  return { tag: values.tag, embedding: parts.map(Number), k: Number(kText) };
}

/** Lists the `k` notes carrying a tag nearest to an embedding, one line each. */
export async function run(client, args) {
  const { tag, embedding, k } = parse(args);
  const rows = await similarByTag(client, tag, embedding, k);
  return rows.map((r) => `#${r.id} ${r.title} (${Number(r.distance).toFixed(3)})`).join("\n");
}
