// commands.mjs: every src/commands/<name>.mjs exports `run(client, args)` and is reached as `notes <name>`.
// `args` is the raw argv after the command name; parse it with node:util parseArgs. A new command is a
// new file; nothing here changes.
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "commands");

export function commandNames() {
  return readdirSync(DIR).filter((f) => f.endsWith(".mjs")).map((f) => f.slice(0, -4)).sort();
}

export async function command(name) {
  if (!commandNames().includes(name)) throw Object.assign(new Error(`unknown command ${name}; known: ${commandNames().join(", ")}`), { code: "UNKNOWN_COMMAND" });
  const m = await import(pathToFileURL(join(DIR, `${name}.mjs`)).href);
  if (typeof m.run !== "function") throw new Error(`command ${name} must export run(client, args)`);
  return m.run;
}
