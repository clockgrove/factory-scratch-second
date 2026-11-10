// notes bump-m110907182 <id>
export async function run(client, args) {
  const id = args[0] === undefined || args[0] === "" ? NaN : Number(args[0]);
  if (!Number.isInteger(id)) throw Object.assign(new Error("bump-m110907182 needs a numeric id"), { code: "BAD_ID" });
  const { rows } = await client.query(
    "UPDATE notes SET m110907182_count = m110907182_count + 1 WHERE id = $1 RETURNING m110907182_count",
    [id],
  );
  return rows.length ? `#${id} m110907182_count=${rows[0].m110907182_count}` : `no note #${id}`;
}
