/** Increment a note's counter and report its value using the supplied decimal id. */
export async function run(client, args) {
  const id = args[0];
  if (typeof id !== "string" || !/^-?\d+$/.test(id)) {
    throw Object.assign(new Error("bump-m111002302 needs a decimal id"), { code: "BAD_ID" });
  }
  const value = BigInt(id);
  if (value < -2147483648n || value > 2147483647n) return `no note #${id}`;
  const { rows } = await client.query(
    "UPDATE notes SET m111002302_count = m111002302_count + 1 WHERE id = $1 RETURNING m111002302_count",
    [Number(value)],
  );
  return rows.length ? `#${id} m111002302_count=${rows[0].m111002302_count}` : `no note #${id}`;
}
