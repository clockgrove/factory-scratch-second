export const code = "M111002303";

/** Reject titles containing the whitespace-separated word m111002303, ignoring case. */
export function check(note) {
  if (typeof note.title !== "string") return null;
  return note.title.toLowerCase().split(/\s+/).includes("m111002303")
    ? "title contains m111002303"
    : null;
}
