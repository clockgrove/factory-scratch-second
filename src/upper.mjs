import { greet } from "./greet.mjs";

/** The greeting for a name in upper case, ending in an exclamation mark. */
export function upper(name) {
  return greet(name).toUpperCase().replace(/\.$/, "!");
}
