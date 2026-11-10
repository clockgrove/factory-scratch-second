// A note title may not contain the word m110610173 in any letter case.
export const code = "M110610173";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m110610173");
  return found ? "title contains m110610173" : null;
}
