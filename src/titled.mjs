import { greet } from "./greet.mjs";

/** The greeting for a name with each whitespace- or hyphen-separated word title-cased. */
export function titled(name) {
  const who = String(name ?? "").replace(/[^\s-]+/gu, (word) => {
    const [first, ...rest] = word;
    return first.toUpperCase() + rest.join("").toLowerCase();
  });
  return greet(who);
}
