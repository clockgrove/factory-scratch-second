// notes bump-m110608362 <id>

const INT4_MIN = -2147483648;
const INT4_MAX = 2147483647;

/** Increments the m110608362 counter of a note and reports the new value. */
export async function run(client, args) {
  const raw = typeof args[0] === "string" ? args[0].trim() : "";
  const id = Number(raw);
  if (raw === "" || !Number.isInteger(id)) {
    throw Object.assign(new Error("bump-m110608362 needs an integer id"), { code: "BAD_ID" });
  }
  if (id < INT4_MIN || id > INT4_MAX) return `no note #${raw}`;
  const { rows } = await client.query(
    "UPDATE notes SET m110608362_count = m110608362_count + 1 WHERE id = $1 RETURNING m110608362_count",
    [id],
  );
  const row = rows[0];
  if (!row) return `no note #${id}`;
  return `#${id} m110608362_count=${row.m110608362_count}`;
}
