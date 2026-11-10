import { greet } from "./greet.mjs";

/** The greeting cut to a code-point width, with an ellipsis when shortened. */
export function truncated(name, max) {
  if (!Number.isInteger(max) || max < 1) {
    throw new RangeError("max must be an integer of at least 1");
  }

  const greeting = greet(name);
  const points = [...greeting];
  return points.length <= max
    ? greeting
    : `${points.slice(0, max - 1).join("").trimEnd()}…`;
}
