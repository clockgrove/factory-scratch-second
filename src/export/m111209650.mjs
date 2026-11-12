/** One line per note: <id><TAB><word count>. */
export function format(rows) {
  return rows.map((r) => `${r.id}\t${String(r.title ?? "").split(/\s+/).filter(Boolean).length}`).join("\n");
}
