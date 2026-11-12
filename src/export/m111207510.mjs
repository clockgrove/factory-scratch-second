// Export each note's id and title word count separated by a tab.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${(r.title?.match(/\S+/gu) || []).length}`).join("\n");
}
