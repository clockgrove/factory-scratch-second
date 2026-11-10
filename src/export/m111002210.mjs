// Render notes as plain lines of id, title and semicolon-joined tags separated by tabs, one note per line.
export function format(rows) {
  return rows.map((row) => `${row.id}\t${row.title}\t${(row.tags ?? []).join(";")}`).join("\n");
}
