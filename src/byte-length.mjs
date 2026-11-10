import { greet } from "./greet.mjs";

/** The number of UTF-8 bytes in the greeting for a name. */
export function byteLength(name) {
  return Buffer.byteLength(greet(name), "utf8");
}
