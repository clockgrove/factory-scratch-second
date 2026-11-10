import { greet } from "./greet.mjs";

/** The greeting for a name with its final period replaced by a question mark. */
export function asked(name) {
  return greet(name).replace(/\.$/, "?");
}
