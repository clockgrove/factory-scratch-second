/** A greeting for a name; empty or missing names get the generic form. */
export function greet(name) {
  const who = String(name ?? "").trim();
  return who ? `Hello, ${who}.` : "Hello.";
}
