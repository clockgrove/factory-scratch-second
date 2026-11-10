import { parseArgs } from "node:util";
import { since } from "../notes.mjs";

/** Check a four-digit Gregorian calendar date without applying the process time zone. */
function validDate(date) {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [year, month, day] = date.split("-").map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return month >= 1 && month <= 12 && day >= 1 && day <= days[month - 1];
}

/** Print notes created on or after the requested UTC date, oldest first. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { date: { type: "string" }, limit: { type: "string", default: "20" } }, allowPositionals: false, strict: true }));
  } catch {
    throw Object.assign(new Error("since needs --date YYYY-MM-DD and an optional --limit"), { code: "BAD_ARGS" });
  }
  if (!validDate(values.date)) throw Object.assign(new Error("since needs a real --date YYYY-MM-DD"), { code: "BAD_DATE" });
  const limit = Number(values.limit);
  if (!/^\d+$/.test(values.limit) || !Number.isInteger(limit) || limit < 1 || limit > 2147483647) {
    throw Object.assign(new Error("since needs --limit from 1 to 2147483647 in decimal digits"), { code: "BAD_ARGS" });
  }
  return (await since(client, { date: values.date, limit })).map((note) => `#${note.id} ${note.title}`).join("\n");
}
