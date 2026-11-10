// notes add --title T [--body B] [--tag X ...] [--embedding 1,2,3]
import { parseArgs } from "node:util";
import { add } from "../notes.mjs";

export async function run(client, args) {
  const { values } = parseArgs({ args, options: { title: { type: "string" }, body: { type: "string", default: "" }, tag: { type: "string", multiple: true, default: [] }, embedding: { type: "string" } } });
  const embedding = values.embedding ? values.embedding.split(",").map(Number) : null;
  const row = await add(client, { title: values.title, body: values.body, tags: values.tag, embedding });
  return `added #${row.id}`;
}
