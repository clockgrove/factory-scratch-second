// One line per note: id, title and tags joined by semicolons, separated by tabs.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.title}\t${(r.tags || []).join(";")}`).join("\n");
}
