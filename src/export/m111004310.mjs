// Plain lines of id, title and semicolon-joined tags, separated by tabs.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.title}\t${(r.tags || []).join(";")}`).join("\n");
}
