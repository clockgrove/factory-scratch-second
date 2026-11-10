// Render notes as tab-separated id, title and semicolon-joined tags, one line per note.
export function format(rows) {
  return rows.map((row) => `${row.id}\t${row.title}\t${row.tags.join(";")}`).join("\n");
}
