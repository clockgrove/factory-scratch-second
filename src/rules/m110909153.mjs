// A note title may not contain the word m110909153 in any letter case.
export const code = "M110909153";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m110909153");
  return found ? "title contains m110909153" : null;
}
