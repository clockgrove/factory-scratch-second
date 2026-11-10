export const code = "M111000133";

/** Reject titles containing the whitespace-separated word m111000133, ignoring case. */
export function check(note) {
  if (typeof note.title !== "string") return null;
  return note.title.toLowerCase().split(/\s+/).includes("m111000133")
    ? "title contains m111000133"
    : null;
}
