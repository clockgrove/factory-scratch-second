// A title may not contain the word m111007033.
export const code = "M111007033";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m111007033");
  return found ? "title contains m111007033" : null;
}
