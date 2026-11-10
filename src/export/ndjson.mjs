// Render notes as newline-delimited JSON, one object of id, title, body and tags per line.
export function format(rows) {
  return rows
    .map((r) => JSON.stringify({ id: r.id, title: r.title, body: r.body ?? null, tags: r.tags ?? [] }))
    .join("\n");
}
