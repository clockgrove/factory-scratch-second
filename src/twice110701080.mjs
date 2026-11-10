import { greet } from "./greet.mjs";

/** The greeting for a name repeated twice, joined by exactly one space. */
export function twice110701080(name) {
  const greeting = greet(name);
  return `${greeting} ${greeting}`;
}
