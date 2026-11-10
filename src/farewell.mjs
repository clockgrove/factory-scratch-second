/** A farewell for a name; empty or missing names get the generic form. */
export function farewell(name) {
  const who = String(name ?? "").trim();
  return who ? `Goodbye, ${who}.` : "Goodbye.";
}
