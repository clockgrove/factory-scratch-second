/** Increment a note's counter and return its new value, preserving the given id. */
export async function run(client, args) {
  const id = args[0];
  if (typeof id !== "string" || !/^-?\d+$/.test(id)) {
    throw Object.assign(new Error("bump-m111007032 needs a decimal id"), { code: "BAD_ID" });
  }
  const value = BigInt(id);
  if (value < -2147483648n || value > 2147483647n) return `no note #${id}`;
  const { rows } = await client.query(
    "UPDATE notes SET m111007032_count = m111007032_count + 1 WHERE id = $1 RETURNING m111007032_count",
    [id],
  );
  return rows.length ? `#${id} m111007032_count=${rows[0].m111007032_count}` : `no note #${id}`;
}
