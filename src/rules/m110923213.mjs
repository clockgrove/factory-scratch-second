// A note title may not contain the word m110923213 in any letter case.
export const code = "M110923213";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m110923213");
  return found ? "title contains m110923213" : null;
}
