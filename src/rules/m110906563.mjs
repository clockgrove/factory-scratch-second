// A note title may not contain the word m110906563 in any letter case.
export const code = "M110906563";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m110906563");
  return found ? "title contains m110906563" : null;
}
