import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

/** Validates the tag, three-dimensional embedding and result limit before querying. */
function parseOptions(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: {
      tag: { type: "string" },
      embedding: { type: "string" },
      k: { type: "string", default: "3" },
    } }));
  } catch (cause) {
    throw Object.assign(new Error(cause.message), { code: "BAD_ARGS" });
  }
  const parts = values.embedding?.split(",") ?? [];
  const k = /^\d+$/.test(values.k) ? Number(values.k) : 0;
  if (!values.tag || parts.length !== 3 ||
      parts.some((part) => !/^-?\d+(\.\d+)?$/.test(part) || Math.abs(Number(part)) > 3.4e38) ||
      k < 1 || k > 2147483647) {
    throw Object.assign(new Error("Expected --tag, --embedding with three numbers, and --k from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  return { tag: values.tag, embedding: parts.map(Number), k };
}

/** Returns the nearest embedded notes carrying the tag, with distances to three decimals. */
export async function run(client, args) {
  const { tag, embedding, k } = parseOptions(args);
  const rows = await similarByTag(client, tag, embedding, k);
  return rows.map((row) => `#${row.id} ${row.title} (${Number(row.distance).toFixed(3)})`).join("\n");
}
