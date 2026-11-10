import { greet } from "./greet.mjs";

/** The number of characters (UTF-16 code units) in the greeting for a name. */
export function length(name) {
  return greet(name).length;
}
