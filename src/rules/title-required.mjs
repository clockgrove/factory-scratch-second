// A note needs a non-blank title.
export const code = "TITLE_REQUIRED";
export function check(note) {
  return typeof note.title === "string" && note.title.trim() ? null : "title is required";
}
