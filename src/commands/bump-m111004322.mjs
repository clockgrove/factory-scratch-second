/** Increment a note's counter and return its new value, preserving the given id. */
export async function run(client, args) {
  const id = args[0];
  if (typeof id !== "string" || !/^-?\d+$/.test(id)) {
    throw Object.assign(new Error("bump-m111004322 needs a decimal id"), { code: "BAD_ID" });
  }
  const value = BigInt(id);
  if (value < -2147483648n || value > 2147483647n) return `no note #${id}`;
  const { rows } = await client.query(
    "UPDATE notes SET m111004322_count = m111004322_count + 1 WHERE id = $1 RETURNING m111004322_count",
    [id],
  );
  return rows.length ? `#${id} m111004322_count=${rows[0].m111004322_count}` : `no note #${id}`;
}
