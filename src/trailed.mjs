import { greet } from "./greet.mjs";

/** The greeting for a name with its final period replaced by an ellipsis. */
export function trailed(name) {
  return greet(name).replace(/\.$/, "...");
}
