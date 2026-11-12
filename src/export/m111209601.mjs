// Tag count: one `<id><TAB><number of tags>` line per note.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${(r.tags || []).length}`).join("\n");
}
