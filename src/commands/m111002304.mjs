import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

/** Find the nearest embedded notes carrying a tag after validating CLI arguments. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { tag: { type: "string" }, embedding: { type: "string" }, k: { type: "string", default: "3" } }, strict: true, allowPositionals: false }));
  } catch {
    throw Object.assign(new Error("m111002304 needs --tag, --embedding and an optional --k"), { code: "BAD_ARGS" });
  }
  const parts = values.embedding?.split(",");
  const k = Number(values.k);
  if (!values.tag || parts?.length !== 3
    || !parts.every((part) => part.match(/^-?\d+(\.\d+)?$/)?.[0] === part && Math.abs(Number(part)) <= 3.4e38)
    || values.k.match(/^\d+$/)?.[0] !== values.k || k < 1 || k > 2147483647) {
    throw Object.assign(new Error("m111002304 needs a non-empty tag, three float4 numbers and k from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  const rows = await similarByTag(client, values.tag, parts.map(Number), k);
  return rows.map((note) => `#${note.id} ${note.title} (${Number(note.distance).toFixed(3)})`).join("\n");
}
