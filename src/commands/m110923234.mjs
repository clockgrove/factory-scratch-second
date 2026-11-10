import { parseArgs } from "node:util";
import { similarByTag } from "../notes.mjs";

/** Find the nearest embedded notes carrying a tag, with distances rounded to three places. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({
      args,
      options: { tag: { type: "string" }, embedding: { type: "string" }, k: { type: "string", default: "3" } },
      strict: true,
      allowPositionals: false,
    }));
  } catch (err) {
    throw Object.assign(new Error(err.message), { code: "BAD_ARGS" });
  }
  const components = values.embedding?.split(",") ?? [];
  const embedding = components.map(Number);
  const k = Number(values.k);
  if (!values.tag || components.length !== 3 ||
      components.some((value) => !/^-?\d+(\.\d+)?$/.test(value) || /\s/.test(value)) ||
      embedding.some((value) => Math.abs(value) > 3.4e38) ||
      !/^\d+$/.test(values.k) || /\s/.test(values.k) || k < 1 || k > 2147483647) {
    throw Object.assign(new Error("m110923234 needs --tag, a three-number --embedding and --k from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  const rows = await similarByTag(client, values.tag, embedding, k);
  return rows.map((row) => `#${row.id} ${row.title} (${Number(row.distance).toFixed(3)})`).join("\n");
}
