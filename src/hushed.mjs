import { greet } from "./greet.mjs";

/** The greeting for a name in lower case with its final period replaced by three periods. */
export function hushed(name) {
  return greet(name).toLowerCase().replace(/\.$/, "...");
}
