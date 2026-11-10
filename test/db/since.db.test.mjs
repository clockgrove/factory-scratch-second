import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { run } from "../../src/commands/since.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("since"); });
beforeEach(async () => {
  await db.client.query("DELETE FROM notes");
  await db.client.query("SET TIME ZONE 'UTC'");
});
after(async () => { await db.done(); });

/** Add a note through the store, then assign its creation timestamp directly. */
async function seed(title, createdAt) {
  const note = await add(db.client, { title });
  await db.client.query("UPDATE notes SET created_at = $1::timestamptz WHERE id = $2", [createdAt, note.id]);
  return note;
}

test("since prints an empty string for an empty store", async () => {
  assert.equal(await run(db.client, ["--date", "2026-01-05"]), "");
});

test("since prints an empty string when every note predates the cutoff", async () => {
  await seed("earlier", "2026-01-04T23:59:59Z");
  assert.equal(await run(db.client, ["--date", "2026-01-05"]), "");
});

test("since excludes the previous UTC second and includes exactly UTC midnight", async () => {
  await seed("before", "2026-01-04T23:59:59Z");
  const midnight = await seed("midnight", "2026-01-05T00:00:00Z");
  assert.equal(await run(db.client, ["--date", "2026-01-05"]), `#${midnight.id} midnight`);
});

test("since has the same UTC cutoff in Los Angeles process and database time zones", async () => {
  await seed("before", "2026-01-04T23:59:59Z");
  const midnight = await seed("midnight", "2026-01-05T00:00:00Z");
  const later = await seed("later", "2026-01-05T07:59:59Z");
  const expected = `#${midnight.id} midnight\n#${later.id} later`;
  const originalTZ = process.env.TZ;
  try {
    process.env.TZ = "UTC";
    assert.equal(await run(db.client, ["--date", "2026-01-05"]), expected);
    await db.client.query("SET TIME ZONE 'America/Los_Angeles'");
    assert.equal(await run(db.client, ["--date", "2026-01-05"]), expected);
    process.env.TZ = "America/Los_Angeles";
    assert.equal(await run(db.client, ["--date", "2026-01-05"]), expected);
  } finally {
    if (originalTZ === undefined) delete process.env.TZ;
    else process.env.TZ = originalTZ;
    await db.client.query("SET TIME ZONE 'UTC'");
  }
});

test("since orders by created_at then id ascending rather than insertion order", async () => {
  const latest = await seed("latest", "2026-01-06T00:00:00Z");
  const first = await seed("first", "2026-01-05T00:00:00Z");
  const tied = await seed("tied", "2026-01-05T00:00:00Z");
  assert.equal(await run(db.client, ["--date", "2026-01-05"]), `#${first.id} first\n#${tied.id} tied\n#${latest.id} latest`);
});

test("since applies a custom limit and accepts padded digits and the maximum limit", async () => {
  const first = await seed("first", "2026-01-05T00:00:00Z");
  const second = await seed("second", "2026-01-05T00:00:01Z");
  const third = await seed("third", "2026-01-05T00:00:02Z");
  for (const limit of ["2", "02"]) {
    assert.equal(await run(db.client, ["--date", "2026-01-05", "--limit", limit]), `#${first.id} first\n#${second.id} second`);
  }
  assert.equal(await run(db.client, ["--date", "2026-01-05", "--limit", "2147483647"]), `#${first.id} first\n#${second.id} second\n#${third.id} third`);
});

test("since defaults to the oldest twenty qualifying notes", async () => {
  const notes = [];
  for (let i = 20; i >= 0; i--) {
    notes.push(await seed(`note ${i}`, `2026-01-05T00:00:${String(i).padStart(2, "0")}Z`));
  }
  const expected = notes.reverse().slice(0, 20).map((note) => `#${note.id} ${note.title}`).join("\n");
  assert.equal(await run(db.client, ["--date", "2026-01-05"]), expected);
});

for (const [date, timestamp] of [
  ["2024-02-29", "2024-02-29T00:00:00Z"],
  ["2000-02-29", "2000-02-29T00:00:00Z"],
  ["0001-01-05", "0001-01-05T00:00:00Z"],
  ["0099-01-05", "0099-01-05T00:00:00Z"],
  ["0000-02-29", "0001-02-29T00:00:00Z BC"],
]) {
  test(`since accepts calendar date ${date} at its exact UTC cutoff`, async () => {
    const note = await seed("at cutoff", timestamp);
    assert.equal(await run(db.client, ["--date", date]), `#${note.id} at cutoff`);
  });
}
