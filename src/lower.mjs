import { greet } from "./greet.mjs";

/** The greeting for a name in lower case, ending in an exclamation mark. */
export function lower(name) {
  return greet(name).toLowerCase().replace(/\.$/, "!");
}
