import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const LFS_PREFIX = Buffer.from('version https://git-lfs.github.com/spec/v1', 'ascii');

/** Returns true when the content starts with RIFF and has WAVE at bytes 8-11. */
export function isRiffWave(content) {
  return (
    content.length >= 12 &&
    content.toString('latin1', 0, 4) === 'RIFF' &&
    content.toString('latin1', 8, 12) === 'WAVE'
  );
}

/** Returns true when the content starts with the Git LFS pointer version line. */
export function isLfsPointer(content) {
  return content.length >= LFS_PREFIX.length && content.subarray(0, LFS_PREFIX.length).equals(LFS_PREFIX);
}

/** Marks content for a path that exists but cannot be read (a directory, a permission error). */
export const UNREADABLE = Symbol('unreadable');

/** Returns the one output line for a path and its content, where null content means the file is missing. */
export function mediaLine(path, content) {
  if (content === null) return `${path} missing`;
  if (content === UNREADABLE) return `${path} unreadable`;
  if (isLfsPointer(content)) return `${path} lfs-pointer`;
  const sha = createHash('sha256').update(content).digest('hex').slice(0, 12);
  return `${path} bytes ${content.length} riff ${isRiffWave(content) ? 'yes' : 'no'} sha256 ${sha}`;
}

/** Reads the file: null when it does not exist, UNREADABLE when it exists but cannot be read. */
export function readMedia(path, read = readFileSync) {
  try {
    return read(path);
  } catch (err) {
    return err?.code === 'ENOENT' || err?.code === 'ENOTDIR' ? null : UNREADABLE;
  }
}

/** Prints the line for the path argument and always exits with code 0. */
function main() {
  const path = process.argv[2] ?? '';
  console.log(mediaLine(path, path ? readMedia(path) : null));
  process.exitCode = 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
