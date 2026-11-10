// Markdown table: a header and delimiter line, then id, title and comma-joined tags per note.
const HEADER = "| id | title | tags |";
const DELIMITER = "| --- | --- | --- |";

/** Escape the pipes of a cell so they do not end the column. */
function cell(value) {
  return String(value ?? "").replaceAll("|", "\\|");
}

/** Replace each line break (CRLF, CR or LF) of a title or tag with one space. */
function singleLine(value) {
  return String(value ?? "").replace(/\r\n|\r|\n/g, " ");
}

/** Render one note as a table row. */
function row(r) {
  const tags = (r.tags || []).map((t) => cell(singleLine(t))).join(", ");
  return `| ${String(r.id)} | ${cell(singleLine(r.title))} | ${tags} |`;
}

/** Render rows as a Markdown table joined by \n, header first, no trailing newline. */
export function format(rows) {
  return [HEADER, DELIMITER, ...rows.map(row)].join("\n");
}
