import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mediaLine } from '../scripts/media-check.mjs';
import { beepWav } from '../scripts/gen-beep.mjs';

/** Returns the first 12 hex characters of the SHA-256 of a buffer. */
const sha12 = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 12);

test('a WAV buffer reports its size, riff yes and its hash', () => {
  const wav = beepWav();
  assert.equal(mediaLine('media/beep.wav', wav), `media/beep.wav bytes 4044 riff yes sha256 ${sha12(wav)}`);
});

test('a non-WAV buffer reports riff no', () => {
  const buf = Buffer.from('hello');
  assert.equal(mediaLine('a.bin', buf), 'a.bin bytes 5 riff no sha256 2cf24dba5fb0');
});

test('a RIFF buffer without WAVE at bytes 8-11 reports riff no', () => {
  const buf = Buffer.from('RIFF\0\0\0\0AVI LIST');
  assert.equal(mediaLine('a.avi', buf), `a.avi bytes 16 riff no sha256 ${sha12(buf)}`);
});

test('an LFS pointer text reports lfs-pointer', () => {
  const pointer = Buffer.from(
    'version https://git-lfs.github.com/spec/v1\noid sha256:0000000000000000000000000000000000000000000000000000000000000000\nsize 4044\n',
  );
  assert.equal(mediaLine('media/beep.wav', pointer), 'media/beep.wav lfs-pointer');
});

test('null content reports missing', () => {
  assert.equal(mediaLine('media/none.wav', null), 'media/none.wav missing');
});
