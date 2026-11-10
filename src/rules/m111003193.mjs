export const code = "M111003193";

/** Reject titles containing the whitespace-separated word m111003193, ignoring case. */
export function check(note) {
  if (typeof note.title !== "string") return null;
  return note.title.toLowerCase().split(/\s+/).includes("m111003193")
    ? "title contains m111003193"
    : null;
}
