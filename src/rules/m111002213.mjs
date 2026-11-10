export const code = "M111002213";

/** Reject titles containing the whitespace-separated word m111002213, ignoring case. */
export function check(note) {
  if (typeof note.title !== "string") return null;
  return note.title.toLowerCase().split(/\s+/).includes("m111002213")
    ? "title contains m111002213"
    : null;
}
