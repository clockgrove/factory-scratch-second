import { greet } from "./greet.mjs";

/** The greeting for a name with every space (U+0020) replaced by an asterisk. */
export function starL1320(name) {
  return greet(name).replaceAll(" ", "*");
}
