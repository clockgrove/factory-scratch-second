// notes bump-m110909152 <id>

/** Adds one to the note's m110909152_count and reports the new value. */
export async function run(client, args) {
  const raw = args[0];
  if (typeof raw !== "string" || !/^-?\d+$/.test(raw)) {
    throw Object.assign(new Error("bump-m110909152 needs a decimal id"), { code: "BAD_ID" });
  }
  const big = BigInt(raw);
  if (big < -2147483648n || big > 2147483647n) return `no note #${raw}`;
  const { rows } = await client.query(
    "UPDATE notes SET m110909152_count = m110909152_count + 1 WHERE id = $1 RETURNING m110909152_count",
    [Number(big)],
  );
  return rows.length ? `#${raw} m110909152_count=${rows[0].m110909152_count}` : `no note #${raw}`;
}
