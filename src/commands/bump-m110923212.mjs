// notes bump-m110923212 <id>
const INT4_MIN = -2147483648;
const INT4_MAX = 2147483647;

/** Increment the note's m110923212_count and return `#<id> m110923212_count=<n>`, or `no note #<id>`. */
export async function run(client, args) {
  const raw = args[0];
  if (typeof raw !== "string" || !/^-?\d+$/.test(raw)) {
    throw Object.assign(new Error("bump-m110923212 needs a decimal id"), { code: "BAD_ID" });
  }
  const id = Number(raw);
  if (id < INT4_MIN || id > INT4_MAX) return `no note #${raw}`;
  const { rows } = await client.query(
    "UPDATE notes SET m110923212_count = m110923212_count + 1 WHERE id = $1 RETURNING m110923212_count",
    [id],
  );
  return rows.length ? `#${raw} m110923212_count=${rows[0].m110923212_count}` : `no note #${raw}`;
}
