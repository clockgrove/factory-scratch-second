// One note ID and JavaScript title length per tab-separated line.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${(r.title ?? "").length}`).join("\n");
}
