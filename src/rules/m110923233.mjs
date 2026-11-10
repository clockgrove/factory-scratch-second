export const code = "M110923233";

/** Reject titles containing the whitespace-separated word m110923233, ignoring case. */
export function check(note) {
  if (typeof note.title !== "string") return null;
  return note.title.toLowerCase().split(/\s+/).includes("m110923233")
    ? "title contains m110923233"
    : null;
}
