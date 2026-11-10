// notes bump-m110609332 <id>
import { parseArgs } from "node:util";

const INT4_MIN = -2147483648;
const INT4_MAX = 2147483647;

/** Throws the BAD_ID error this command reports for a missing or non-integer id. */
function badId() {
  throw Object.assign(new Error("bump-m110609332 needs an integer id"), { code: "BAD_ID" });
}

/** Returns the raw id argument: a lone negative number is the id, any other parse error is BAD_ID. */
function rawId(args) {
  if (args.length === 1 && /^-\d/.test(args[0])) return args[0];
  try {
    return parseArgs({ args, allowPositionals: true }).positionals[0];
  } catch {
    return badId();
  }
}

/** Increments the m110609332 counter of a note and reports the new value. */
export async function run(client, args) {
  const raw = rawId(args);
  if (typeof raw !== "string" || raw.trim() === "") badId();
  const id = Number(raw);
  if (!Number.isInteger(id)) badId();
  if (id < INT4_MIN || id > INT4_MAX) return `no note #${id}`;
  const { rows } = await client.query(
    "UPDATE notes SET m110609332_count = m110609332_count + 1 WHERE id = $1 RETURNING m110609332_count",
    [id],
  );
  const row = rows[0];
  if (!row) return `no note #${id}`;
  return `#${id} m110609332_count=${row.m110609332_count}`;
}
