import { greet } from "./greet.mjs";

/** The number of Unicode letters in the greeting for a name. */
export function shoutCount110700412(name) {
  return (greet(name).match(/\p{L}/gu) ?? []).length;
}
