// Render each note's ID and tag count separated by a tab.
export function format(rows) {
  return rows.map((row) => `${row.id}\t${(row.tags ?? []).length}`).join("\n");
}
