import { greet } from "./greet.mjs";
import { shout } from "./shout.mjs";
import { whisper } from "./whisper.mjs";

/** All three greetings for a name: plain, shouted and whispered. */
export function greetings(name) {
  return [greet(name), shout(name), whisper(name)];
}
