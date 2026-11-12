// One line per note: id, a tab, and the number of whitespace-separated words in the title.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${String(r.title ?? "").split(/\s+/).filter(Boolean).length}`).join("\n");
}
