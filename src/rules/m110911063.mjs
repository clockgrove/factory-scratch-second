// A note title may not contain the word m110911063 in any letter case.
export const code = "M110911063";
export function check(note) {
  if (typeof note.title !== "string") return null;
  const found = note.title.split(/\s+/).some((word) => word.toLowerCase() === "m110911063");
  return found ? "title contains m110911063" : null;
}
