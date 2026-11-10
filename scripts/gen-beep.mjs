import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RATE = 8000;
const SAMPLES = 2000;
const DATA_SIZE = SAMPLES * 2;

/** Builds the 44-byte canonical RIFF/WAVE header for the beep. */
function header() {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0, 'ascii');
  h.writeUInt32LE(36 + DATA_SIZE, 4);
  h.write('WAVE', 8, 'ascii');
  h.write('fmt ', 12, 'ascii');
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(1, 22);
  h.writeUInt32LE(RATE, 24);
  h.writeUInt32LE(RATE * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write('data', 36, 'ascii');
  h.writeUInt32LE(DATA_SIZE, 40);
  return h;
}

/** Builds the little-endian 16-bit samples of a 440 Hz sine. */
function samples() {
  const d = Buffer.alloc(DATA_SIZE);
  for (let i = 0; i < SAMPLES; i++) {
    d.writeInt16LE(Math.round(16383 * Math.sin((2 * Math.PI * 440 * i) / RATE)), i * 2);
  }
  return d;
}

/** Returns the complete beep WAV file as a Buffer. */
export function beepWav() {
  return Buffer.concat([header(), samples()]);
}

/** Writes the beep WAV to media/beep.wav at the repository root. */
function writeBeep() {
  const target = new URL('../media/beep.wav', import.meta.url);
  mkdirSync(new URL('./', target), { recursive: true });
  writeFileSync(fileURLToPath(target), beepWav());
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  writeBeep();
}
