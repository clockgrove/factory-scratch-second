import { greet } from "./greet.mjs";

/** The greeting for a name with every space removed, for a URL slug. */
export function compact(name) {
  return greet(name).replaceAll(" ", "");
}
