// rules.mjs: every src/rules/*.mjs exports `code` (a short upper-case string) and `check(note)`,
// which returns a problem string or null. A new rule is a new file; nothing here changes.
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "rules");

export async function loadRules() {
  const rules = [];
  for (const f of readdirSync(DIR).filter((f) => f.endsWith(".mjs")).sort()) {
    const m = await import(pathToFileURL(join(DIR, f)).href);
    if (typeof m.check !== "function" || typeof m.code !== "string") throw new Error(`rule ${f} must export code and check(note)`);
    rules.push(m);
  }
  return rules;
}
