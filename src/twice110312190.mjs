import { greet } from "./greet.mjs";

/** The greeting for a name repeated twice, separated by one space. */
export function twice110312190(name) {
  return [greet(name), greet(name)].join(" ");
}
