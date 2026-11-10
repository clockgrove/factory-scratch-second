import { greet } from "./greet.mjs";

/** The greeting for a name wrapped in square brackets, with no space inside them. */
export function bracket110610381(name) {
  return `[${greet(name)}]`;
}
