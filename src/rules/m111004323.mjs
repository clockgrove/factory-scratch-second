export const code = "M111004323";

/** Refuse a title containing the whitespace-separated word m111004323, ignoring case. */
export function check(note) {
  return typeof note.title === "string" && note.title.toLowerCase().split(/\s+/u).includes("m111004323")
    ? "title contains m111004323"
    : null;
}
