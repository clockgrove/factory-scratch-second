/** Render note IDs, stored titles and semicolon-joined tags as tab-separated lines. */
export function format(rows) {
  return rows.map((row) => `${row.id}\t${row.title}\t${row.tags.join(";")}`).join("\n");
}
