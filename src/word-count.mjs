import { greet } from "./greet.mjs";

/** The number of whitespace-separated words in the greeting for a name. */
export function wordCount(name) {
  return greet(name).split(/\s+/).filter(Boolean).length;
}
