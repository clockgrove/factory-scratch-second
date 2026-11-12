// Title length: one `<id><TAB><title length>` line per note, 0 for a missing title.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${(r.title ?? "").length}`).join("\n");
}
