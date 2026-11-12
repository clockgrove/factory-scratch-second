// Export each note's id and tag count separated by a tab.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.tags?.length ?? 0}`).join("\n");
}
