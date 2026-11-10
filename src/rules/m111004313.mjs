export const code = "M111004313";

/** Reject titles containing the whitespace-separated word m111004313, ignoring case. */
export function check(note) {
  if (typeof note.title !== "string") return null;
  return note.title.toLowerCase().split(/\s+/).includes("m111004313")
    ? "title contains m111004313"
    : null;
}
