// notes bump-m110610172 <id>
const INT4_MIN = -2147483648n;
const INT4_MAX = 2147483647n;

/** Throws the BAD_ID error this command reports for a missing or non-integer id. */
function badId() {
  throw Object.assign(new Error("bump-m110610172 needs an integer id"), { code: "BAD_ID" });
}

/** Increments the m110610172 counter of the note whose id is args[0] and reports the new value. */
export async function run(client, args) {
  // The command takes no options, so the id is args[0] as typed: decimal digits with an optional minus.
  const raw = args[0];
  if (typeof raw !== "string" || !/^-?\d+$/.test(raw)) badId();
  const id = BigInt(raw);
  if (id < INT4_MIN || id > INT4_MAX) return `no note #${id}`;
  const { rows } = await client.query(
    "UPDATE notes SET m110610172_count = m110610172_count + 1 WHERE id = $1 RETURNING m110610172_count",
    [Number(id)],
  );
  const row = rows[0];
  if (!row) return `no note #${id}`;
  return `#${id} m110610172_count=${row.m110610172_count}`;
}
