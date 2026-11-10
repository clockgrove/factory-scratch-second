// notes bump-m111003192 <id>
const INT4_MIN = -2147483648n;
const INT4_MAX = 2147483647n;

/** Increments a note's m111003192_count and returns the new value line. */
export async function run(client, args) {
  const raw = args[0];
  if (typeof raw !== "string" || !/^-?\d+$/.test(raw)) {
    throw Object.assign(new Error("bump-m111003192 needs a decimal id"), { code: "BAD_ID" });
  }
  const id = BigInt(raw);
  if (id < INT4_MIN || id > INT4_MAX) return `no note #${raw}`;
  const { rows } = await client.query(
    "UPDATE notes SET m111003192_count = m111003192_count + 1 WHERE id = $1 RETURNING m111003192_count",
    [id.toString()],
  );
  return rows.length ? `#${raw} m111003192_count=${rows[0].m111003192_count}` : `no note #${raw}`;
}
