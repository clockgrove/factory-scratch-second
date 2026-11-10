/** Increment a note’s counter and report its value using the given decimal id. */
export async function run(client, args) {
  const id = args[0];
  if (typeof id !== "string" || !/^-?\d+$/.test(id)) {
    throw Object.assign(new Error("bump-m111002212 needs a decimal id"), { code: "BAD_ID" });
  }
  const value = Number(id);
  if (value < -2147483648 || value > 2147483647) return `no note #${id}`;
  const { rows } = await client.query(
    "UPDATE notes SET m111002212_count = m111002212_count + 1 WHERE id = $1 RETURNING m111002212_count",
    [value],
  );
  return rows.length ? `#${id} m111002212_count=${rows[0].m111002212_count}` : `no note #${id}`;
}
