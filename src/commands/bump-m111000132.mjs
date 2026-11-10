/** Increment a note’s counter and report its value using the given decimal id. */
export async function run(client, args) {
  const id = args[0];
  if (typeof id !== "string" || !/^-?\d+$/.test(id)) {
    throw Object.assign(new Error("bump-m111000132 needs a decimal id"), { code: "BAD_ID" });
  }
  const value = Number(id);
  if (value < -2147483648 || value > 2147483647) return `no note #${id}`;
  const { rows } = await client.query(
    "UPDATE notes SET m111000132_count = m111000132_count + 1 WHERE id = $1 RETURNING m111000132_count",
    [value],
  );
  return rows.length ? `#${id} m111000132_count=${rows[0].m111000132_count}` : `no note #${id}`;
}
