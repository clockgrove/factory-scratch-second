// notes bump-m110911062 <id>
const INT4_MIN = -2147483648;
const INT4_MAX = 2147483647;

/** Increment the note's m110911062_count and return `#<id> m110911062_count=<n>`, or `no note #<id>`. */
export async function run(client, args) {
  const raw = args[0];
  if (typeof raw !== "string" || !/^-?\d+$/.test(raw)) {
    throw Object.assign(new Error("bump-m110911062 needs a decimal id"), { code: "BAD_ID" });
  }
  const id = Number(raw);
  if (id < INT4_MIN || id > INT4_MAX) return `no note #${raw}`;
  const { rows } = await client.query(
    "UPDATE notes SET m110911062_count = m110911062_count + 1 WHERE id = $1 RETURNING m110911062_count",
    [id],
  );
  return rows.length ? `#${raw} m110911062_count=${rows[0].m110911062_count}` : `no note #${raw}`;
}
