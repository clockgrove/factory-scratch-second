// A note title may not contain the word m110609333 in any letter case.
export const code = "M110609333";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m110609333");
  return found ? "title contains m110609333" : null;
}
