// A title may not contain the word m111104123.
export const code = "M111104123";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m111104123");
  return found ? "title contains m111104123" : null;
}
