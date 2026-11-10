import { greet } from "./greet.mjs";

/** Returns the greeting twice, joined by one space. */
export function twice110700120(name) {
  const greeting = greet(name);
  return `${greeting} ${greeting}`;
}
