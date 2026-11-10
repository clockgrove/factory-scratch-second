import { greet } from "./greet.mjs";

/** The greeting for a name with its final period replaced by two exclamation marks. */
export function doubled(name) {
  return greet(name).replace(/\.$/, "!!");
}
