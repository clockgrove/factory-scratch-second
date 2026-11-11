// notes untagged30 [--min N]
import { parseArgs } from "node:util";

/** Builds a BAD_ARGS error with `message`. */
function bad(message) {
  return Object.assign(new Error(message), { code: "BAD_ARGS" });
}

/** Parses and validates the arguments, returning `min` (a number, or null when absent). */
function parse(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { min: { type: "string" } }, strict: true, allowPositionals: false }));
  } catch (e) {
    throw bad(e.message);
  }
  if (values.min === undefined) return { min: null };
  const min = Number(values.min);
  if (!/^\d+$/.test(values.min) || min < 1 || min > 2147483647) throw bad("--min must be an integer from 1 to 2147483647");
  return { min };
}

/** Counts the notes with an empty `tags` array: `<count> untagged`, or `fewer than N untagged` below `--min N`. */
export async function run(client, args) {
  const { min } = parse(args);
  const { rows } = await client.query("SELECT count(*)::int AS n FROM notes WHERE cardinality(tags) = 0");
  const count = rows[0].n;
  if (min !== null && count < min) return `fewer than ${min} untagged`;
  return `${count} untagged`;
}
