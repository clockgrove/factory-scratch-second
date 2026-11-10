import { greet } from "./greet.mjs";

/** The greeting for a name, repeated twice and joined by one space. */
export function twice110702370(name) {
  const line = greet(name);
  return `${line} ${line}`;
}
