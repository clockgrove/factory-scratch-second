import { greet } from "./greet.mjs";

/** The greeting for a name wrapped in ASCII double quotes, with no space inside them. */
export function quoteL1227(name) {
  return `"${greet(name)}"`;
}
