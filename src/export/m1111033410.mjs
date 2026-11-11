// Plain lines of id, title and tags (joined by semicolons), tab-separated, as stored.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.title}\t${(r.tags || []).join(";")}`).join("\n");
}
