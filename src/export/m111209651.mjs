/** One line per note: <id><TAB><tag count>. */
export function format(rows) {
  return rows.map((r) => `${r.id}\t${(r.tags || []).length}`).join("\n");
}
