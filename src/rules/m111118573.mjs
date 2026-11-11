// A title may not contain the word m111118573.
export const code = "M111118573";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m111118573");
  return found ? "title contains m111118573" : null;
}
