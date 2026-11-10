// Render notes as tab-separated id, title and semicolon-separated tags, one note per line.
export function format(rows) {
  return rows.map((row) => `${row.id}\t${row.title}\t${row.tags.join(";")}`).join("\n");
}
