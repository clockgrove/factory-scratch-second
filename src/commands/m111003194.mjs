// notes m111003194 --tag T --embedding 1,2,3 [--k N]
import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

const NUMBER = /^-?\d+(\.\d+)?$/;
const FLOAT4_MAX = 3.4e38;

/** Throws a BAD_ARGS error with `message`. */
function bad(message) {
  return Object.assign(new Error(message), { code: "BAD_ARGS" });
}

/** Parses and validates the arguments into { tag, embedding, k }. */
function parse(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { tag: { type: "string" }, embedding: { type: "string" }, k: { type: "string" } }, allowPositionals: false }));
  } catch (e) {
    throw bad(e.message);
  }
  if (!values.tag) throw bad("m111003194 needs --tag");
  if (!values.embedding) throw bad("m111003194 needs --embedding");
  const parts = values.embedding.split(",");
  if (parts.length !== 3 || !parts.every((p) => NUMBER.test(p) && Math.abs(Number(p)) <= FLOAT4_MAX)) throw bad("--embedding must be three numbers");
  const k = values.k === undefined ? 3 : values.k;
  if (typeof k === "string" && !(/^\d+$/.test(k) && Number(k) >= 1 && Number(k) <= 2147483647)) throw bad("--k must be 1 to 2147483647");
  return { tag: values.tag, embedding: parts.map(Number), k: Number(k) };
}

/** Returns the `k` notes carrying a tag nearest to an embedding, one `#id title (distance)` line each. */
export async function run(client, args) {
  const { tag, embedding, k } = parse(args);
  const rows = await similarByTag(client, tag, embedding, k);
  return rows.map((r) => `#${r.id} ${r.title} (${Number(r.distance).toFixed(3)})`).join("\n");
}
