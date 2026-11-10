import { greet } from "./greet.mjs";

/** The greeting for a name, repeated twice and joined by one space. */
export function twice110701390(name) {
  const line = greet(name);
  return `${line} ${line}`;
}
