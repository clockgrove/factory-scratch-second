// notes remove <id>
import { remove } from "../notes.mjs";

export async function run(client, args) {
  const id = Number(args[0]);
  if (!Number.isInteger(id)) throw Object.assign(new Error("remove needs a numeric id"), { code: "BAD_ID" });
  return (await remove(client, id)) ? `removed #${id}` : `no note #${id}`;
}
