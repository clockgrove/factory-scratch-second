// Word count: one `<id><TAB><words in the title>` line per note.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${String(r.title ?? "").split(/\s+/).filter(Boolean).length}`).join("\n");
}
