// A YAML sequence of id, title and tags, one item per note.
export function format(rows) {
  if (rows.length === 0) return "[]";
  const lines = [];
  for (const r of rows) {
    const tags = (r.tags || []).map((t) => JSON.stringify(t)).join(", ");
    lines.push(`- id: ${String(r.id)}`, `  title: ${JSON.stringify(r.title)}`, `  tags: [${tags}]`);
  }
  return lines.join("\n");
}
