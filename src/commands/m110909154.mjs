// notes m110909154 --tag T --embedding 1,2,3 [--k N]: the nearest notes among those carrying a tag.
import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

const NUMBER = /^-?\d+(\.\d+)?$/;
const FLOAT4_MAX = 3.4e38;
const K_MAX = 2147483647;

/** An error carrying the BAD_ARGS code. */
function badArgs(message) {
  return Object.assign(new Error(`m110909154: ${message}`), { code: "BAD_ARGS" });
}

/** Parse and check the arguments; returns { tag, embedding, k } or throws BAD_ARGS. */
export function parse(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, strict: true, allowPositionals: false, options: { tag: { type: "string" }, embedding: { type: "string" }, k: { type: "string" } } }));
  } catch (e) {
    throw badArgs(e.message);
  }
  if (!values.tag) throw badArgs("needs a non-empty --tag");
  if (!values.embedding) throw badArgs("needs --embedding");
  const parts = values.embedding.split(",");
  if (parts.length !== 3 || !parts.every((p) => NUMBER.test(p) && Math.abs(Number(p)) <= FLOAT4_MAX)) {
    throw badArgs("--embedding must be three comma-separated numbers within the float4 range");
  }
  const kText = values.k ?? "3";
  const k = Number(kText);
  if (!/^\d+$/.test(kText) || k < 1 || k > K_MAX) throw badArgs(`--k must be an integer from 1 to ${K_MAX}`);
  return { tag: values.tag, embedding: parts.map(Number), k };
}

/** Run the command: one `#<id> <title> (<distance>)` line per nearest tagged note. */
export async function run(client, args) {
  const { tag, embedding, k } = parse(args);
  const rows = await similarByTag(client, tag, embedding, k);
  return rows.map((r) => `#${r.id} ${r.title} (${Number(r.distance).toFixed(3)})`).join("\n");
}
