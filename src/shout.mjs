import { greet } from "./greet.mjs";

/** The greeting for a name, in upper case. */
export function shout(name) {
  return greet(name).toUpperCase();
}
