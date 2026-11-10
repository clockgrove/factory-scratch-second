// A fresh schema per test file against DATABASE_URL, so files can run in any order.
import { connect, migrate } from "../../src/db.mjs";

export async function freshClient(name) {
  const client = await connect();
  const schema = `t_${name}_${process.pid}`;
  await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
  await client.query(`CREATE SCHEMA ${schema}`);
  await client.query(`SET search_path TO ${schema}, public`);
  // pgvector lives in public (setup.sh creates it); a file that races another to create it locally
  // sees a unique violation, which means the other file won.
  await client.query("CREATE EXTENSION IF NOT EXISTS vector SCHEMA public").catch((e) => {
    if (e.code !== "23505") throw e;
  });
  await migrate(client);
  return { client, async done() { await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`); await client.end(); } };
}
