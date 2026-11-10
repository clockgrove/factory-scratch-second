// A fixed-width text table of id, title and tags.
export function format(rows) {
  const lines = ["id   title                          tags"];
  for (const r of rows) lines.push(`${String(r.id).padEnd(4)} ${String(r.title).slice(0, 30).padEnd(30)} ${(r.tags || []).join(",")}`);
  return lines.join("\n");
}
