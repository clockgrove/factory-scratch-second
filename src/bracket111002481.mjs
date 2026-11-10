import { greet } from "./greet.mjs";

/** The greeting for a name wrapped in square brackets, with no space inside. */
export function bracket111002481(name) {
  return `[${greet(name)}]`;
}
