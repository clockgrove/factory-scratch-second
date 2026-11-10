#!/usr/bin/env node
// notes <command> [args]: connects, migrates, runs the command module, prints its result.
import { command, commandNames } from "./commands.mjs";
import { connect, migrate } from "./db.mjs";

const [name, ...args] = process.argv.slice(2);
if (!name || name === "--help") {
  console.log(`usage: notes <${commandNames().join("|")}> [args]`);
  process.exit(name ? 0 : 64);
}
const client = await connect();
try {
  await migrate(client);
  console.log(await (await command(name))(client, args));
} catch (e) {
  console.error(`${e.code ? `${e.code}: ` : ""}${e.message}`);
  process.exitCode = 1;
} finally {
  await client.end();
}
