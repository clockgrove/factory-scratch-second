import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { beepWav } from '../scripts/gen-beep.mjs';

const wav = beepWav();

test('file is 4044 bytes', () => {
  assert.equal(wav.length, 4044);
});

test('RIFF and WAVE tags with RIFF size 4036', () => {
  assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
  assert.equal(wav.readUInt32LE(4), 4036);
  assert.equal(wav.toString('ascii', 8, 12), 'WAVE');
});

test('fmt chunk describes 8000 Hz mono 16-bit PCM', () => {
  assert.equal(wav.toString('ascii', 12, 16), 'fmt ');
  assert.equal(wav.readUInt32LE(16), 16);
  assert.equal(wav.readUInt16LE(20), 1);
  assert.equal(wav.readUInt16LE(22), 1);
  assert.equal(wav.readUInt32LE(24), 8000);
  assert.equal(wav.readUInt32LE(28), 16000);
  assert.equal(wav.readUInt16LE(32), 2);
  assert.equal(wav.readUInt16LE(34), 16);
});

test('data chunk holds 2000 samples', () => {
  assert.equal(wav.toString('ascii', 36, 40), 'data');
  assert.equal(wav.readUInt32LE(40), 4000);
});

test('sample 0 is 0', () => {
  assert.equal(wav.readInt16LE(44), 0);
});

test('sample 1 follows the 440 Hz sine', () => {
  assert.equal(wav.readInt16LE(46), 5550);
});

test('two calls return equal buffers', () => {
  assert.deepEqual(beepWav(), beepWav());
});

test('sha256 matches the committed media/beep.wav LFS oid', () => {
  assert.equal(
    createHash('sha256').update(beepWav()).digest('hex'),
    'faa6433613ef3732c87555cee537cb519b614797ab4d70d5d389b2dd03fdc2b1',
  );
});
