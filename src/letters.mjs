import { greet } from "./greet.mjs";

/** The Unicode code points of the greeting for a name, one per element. */
export function letters(name) {
  return [...greet(name)];
}
