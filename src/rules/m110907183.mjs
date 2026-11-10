// A note title may not contain the word m110907183 in any letter case.
export const code = "M110907183";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m110907183");
  return found ? "title contains m110907183" : null;
}
