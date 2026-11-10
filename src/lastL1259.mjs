import { greet } from "./greet.mjs";

/** The last whitespace-separated word of the greeting for a name, without one trailing period. */
export function lastL1259(name) {
  const words = greet(name).split(/\s+/).filter(Boolean);
  return words.at(-1).replace(/\.$/, "");
}
