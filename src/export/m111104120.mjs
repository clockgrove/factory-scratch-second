// One line per note: id, title and semicolon-joined tags, separated by tabs, with no escaping.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.title}\t${(r.tags || []).join(";")}`).join("\n");
}
