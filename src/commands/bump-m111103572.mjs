// notes bump-m111103572 <id>
const ID = /^-?\d+$/;
const INT4_MIN = -2147483648n;
const INT4_MAX = 2147483647n;

/** Increments the note's m111103572_count and returns the new value line. */
export async function run(client, args) {
  const raw = args[0];
  if (typeof raw !== "string" || !ID.test(raw)) throw Object.assign(new Error("bump-m111103572 needs a decimal id"), { code: "BAD_ID" });
  const id = BigInt(raw);
  if (id < INT4_MIN || id > INT4_MAX) return `no note #${raw}`;
  const { rows } = await client.query("UPDATE notes SET m111103572_count = m111103572_count + 1 WHERE id = $1 RETURNING m111103572_count", [String(id)]);
  return rows.length ? `#${raw} m111103572_count=${rows[0].m111103572_count}` : `no note #${raw}`;
}
