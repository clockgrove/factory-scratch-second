import { greet } from "./greet.mjs";

/** Wraps the greeting for a name in square brackets. */
export function bracket110700411(name) {
  return `[${greet(name)}]`;
}
