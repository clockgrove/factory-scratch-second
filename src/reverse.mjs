import { greet } from "./greet.mjs";

/** The greeting for a name with its code points in reverse order. */
export function reverse(name) {
  return Array.from(greet(name)).reverse().join("");
}
