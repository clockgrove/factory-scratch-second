// notes m111002214 --tag T --embedding 1,2,3 [--k N]
import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

/** Builds a BAD_ARGS error with the given message. */
function bad(message) {
  return Object.assign(new Error(message), { code: "BAD_ARGS" });
}

/** Parses the arguments, turning any parseArgs failure into BAD_ARGS. */
function parse(args) {
  try {
    return parseArgs({ args, options: { tag: { type: "string" }, embedding: { type: "string" }, k: { type: "string" } }, strict: true, allowPositionals: false }).values;
  } catch (e) {
    throw bad(e.message);
  }
}

/** Turns the embedding option into exactly three finite float4-range numbers. */
function parseEmbedding(text) {
  if (!text) throw bad("m111002214 needs --embedding");
  const parts = text.split(",");
  if (parts.length !== 3 || !parts.every((p) => /^-?\d+(\.\d+)?$/.test(p) && Math.abs(Number(p)) <= 3.4e38)) throw bad("--embedding must be three numbers");
  return parts.map(Number);
}

/** Turns the k option into an integer from 1 to 2147483647, defaulting to 3. */
function parseK(text) {
  if (text === undefined) return 3;
  const k = Number(text);
  if (!/^\d+$/.test(text) || k < 1 || k > 2147483647) throw bad("--k must be an integer from 1 to 2147483647");
  return k;
}

/** Lists the notes carrying a tag nearest to an embedding, one line each. */
export async function run(client, args) {
  const values = parse(args);
  if (!values.tag) throw bad("m111002214 needs --tag");
  const numbers = parseEmbedding(values.embedding);
  const k = parseK(values.k);
  const rows = await similarByTag(client, values.tag, numbers, k);
  return rows.map((r) => `#${r.id} ${r.title} (${Number(r.distance).toFixed(3)})`).join("\n");
}
