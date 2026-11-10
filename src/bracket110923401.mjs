import { greet } from "./greet.mjs";

/** The greeting for a name wrapped in square brackets, with no space inside. */
export function bracket110923401(name) {
  return `[${greet(name)}]`;
}
