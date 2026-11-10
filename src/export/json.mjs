// JSON lines: one note per line, stable key order.
export function format(rows) {
  return rows.map((r) => JSON.stringify({ id: r.id, title: r.title, body: r.body, tags: r.tags, created_at: r.created_at })).join("\n");
}
