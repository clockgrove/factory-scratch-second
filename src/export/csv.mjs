// RFC 4180 CSV: a header line, then id, title, body and semicolon-joined tags per note.
const HEADER = "id,title,body,tags";

/** Quote a field holding a comma, double quote, CR or LF, doubling its double quotes. */
function field(value) {
  const s = String(value ?? "");
  return /[",\r\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

/** Render rows as CSV lines joined by \n, header first, no trailing newline. */
export function format(rows) {
  const lines = rows.map((r) => [r.id, r.title, r.body, (r.tags || []).join(";")].map(field).join(","));
  return [HEADER, ...lines].join("\n");
}
