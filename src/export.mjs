// export.mjs: every src/export/<name>.mjs exports `format(rows)` returning a string; `--format <name>`
// picks it by file name. A new format is a new file; nothing here changes.
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "export");

export function formats() {
  return readdirSync(DIR).filter((f) => f.endsWith(".mjs")).map((f) => f.slice(0, -4)).sort();
}

export async function exporter(name) {
  if (!formats().includes(name)) throw Object.assign(new Error(`unknown format ${name}; known: ${formats().join(", ")}`), { code: "UNKNOWN_FORMAT" });
  const m = await import(pathToFileURL(join(DIR, `${name}.mjs`)).href);
  if (typeof m.format !== "function") throw new Error(`export ${name} must export format(rows)`);
  return m.format;
}
