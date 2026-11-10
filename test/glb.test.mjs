import test from 'node:test';
import assert from 'node:assert/strict';
import { triangleGlb } from '../src/glb.mjs';

test('header magic is glTF', () => {
  assert.equal(triangleGlb().subarray(0, 4).toString('latin1'), 'glTF');
});

test('header version is 2', () => {
  assert.equal(triangleGlb().readUInt32LE(4), 2);
});

test('header length equals buffer length', () => {
  const glb = triangleGlb();
  assert.equal(glb.readUInt32LE(8), glb.length);
});

test('JSON chunk describes one triangle mesh', () => {
  const glb = triangleGlb();
  const length = glb.readUInt32LE(12);
  assert.equal(glb.readUInt32LE(16), 0x4e4f534a);
  const doc = JSON.parse(glb.subarray(20, 20 + length).toString('utf8'));
  assert.equal(doc.meshes.length, 1);
  assert.equal(doc.meshes[0].primitives.length, 1);
  const primitive = doc.meshes[0].primitives[0];
  assert.equal(primitive.mode, 4);
  assert.equal(doc.accessors[primitive.attributes.POSITION].count, 3);
});

test('two calls return identical bytes', () => {
  assert.ok(triangleGlb().equals(triangleGlb()));
});
