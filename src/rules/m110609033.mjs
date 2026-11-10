// A note title may not be longer than 60 characters.
export const code = "M110609033";
export function check(note) {
  return typeof note.title === "string" && note.title.length > 60 ? "title longer than 60 characters" : null;
}
