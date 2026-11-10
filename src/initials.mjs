import { greet } from "./greet.mjs";

/** The upper-case first letter of each whitespace-separated word in the greeting. */
export function initials(name) {
  return greet(name).split(/\s+/).map((word) => word.match(/\p{L}/u)?.[0] ?? "").join("").toUpperCase();
}
