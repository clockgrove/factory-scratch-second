// notes show <id>
import { parseArgs } from "node:util";
import { get } from "../notes.mjs";

const MAX_ID = 2147483647;

/** Parse the first positional argument as a positive integer id, or throw BAD_ID. */
function parseId(args) {
  const { positionals } = parseArgs({ args, options: {}, allowPositionals: true, strict: false });
  const id = Number(positionals[0]);
  if (!Number.isSafeInteger(id) || id < 1) throw Object.assign(new Error("show needs a positive integer id"), { code: "BAD_ID" });
  return id;
}

/** Show one note: its id and title, its tags, and its body when it has one. */
export async function run(client, args) {
  const id = parseId(args);
  const note = id <= MAX_ID ? await get(client, id) : null;
  if (!note) throw Object.assign(new Error(`no note #${id}`), { code: "NOT_FOUND" });
  const lines = [`#${note.id} ${note.title}`, `tags: ${note.tags?.length ? note.tags.join(", ") : "none"}`];
  if (note.body) lines.push("", note.body);
  return lines.join("\n");
}
