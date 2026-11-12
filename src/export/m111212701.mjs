// One line per note: id, a tab, and the number of tags.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${(r.tags || []).length}`).join("\n");
}
