import { greet } from "./greet.mjs";

/** The greeting for a name, with one space between every two characters. */
export function spaced(name) {
  return [...greet(name)].join(" ");
}
