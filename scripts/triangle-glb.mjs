import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { triangleGlb } from '../src/glb.mjs';

/** Writes the triangle GLB to media/triangle.glb at the repository root. */
function main() {
  const dir = fileURLToPath(new URL('../media/', import.meta.url));
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}triangle.glb`, triangleGlb());
}

main();
