import { greet } from "./greet.mjs";

/** The greeting for a name, in lower case. */
export function whisper(name) {
  return greet(name).toLowerCase();
}
