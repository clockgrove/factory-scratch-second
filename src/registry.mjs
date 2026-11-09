// registry.mjs: reads formats.json, the one list of export formats the notes CLI may offer.
import { readFileSync } from "node:fs";

const FILE = new URL("../formats.json", import.meta.url);

/** Every registered format, in file order. */
export function formats() {
  return JSON.parse(readFileSync(FILE, "utf8"));
}

/** The registered entry for one format name; throws with code UNKNOWN_FORMAT when it is not registered. */
export function lookup(name) {
  const entry = formats().find((f) => f.name === name);
  if (!entry) throw Object.assign(new Error(`format ${name} is not registered`), { code: "UNKNOWN_FORMAT" });
  return entry;
}
