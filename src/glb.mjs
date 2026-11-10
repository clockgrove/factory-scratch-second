const MAGIC = 0x46546c67;
const JSON_TYPE = 0x4e4f534a;
const BIN_TYPE = 0x004e4942;

/** Returns the glTF JSON document describing one triangle. */
function document() {
  return {
    asset: { version: '2.0', generator: 'factory-scratch triangle-glb' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0 }, mode: 4 }] }],
    buffers: [{ byteLength: 36 }],
    bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: 36, target: 34962 }],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126,
        count: 3,
        type: 'VEC3',
        min: [0, 0, 0],
        max: [1, 1, 0],
      },
    ],
  };
}

/** Returns the little-endian float32 positions of the triangle's three vertices. */
function positions() {
  const buffer = Buffer.alloc(36);
  [0, 0, 0, 1, 0, 0, 0, 1, 0].forEach((v, i) => buffer.writeFloatLE(v, i * 4));
  return buffer;
}

/** Returns a chunk of the given type with its payload padded to a 4-byte multiple. */
function chunk(type, payload, padByte) {
  const padded = Buffer.alloc(Math.ceil(payload.length / 4) * 4, padByte);
  payload.copy(padded);
  const header = Buffer.alloc(8);
  header.writeUInt32LE(padded.length, 0);
  header.writeUInt32LE(type, 4);
  return Buffer.concat([header, padded]);
}

/** Returns the 12-byte GLB header for a file of the given total length. */
function header(length) {
  const buffer = Buffer.alloc(12);
  buffer.writeUInt32LE(MAGIC, 0);
  buffer.writeUInt32LE(2, 4);
  buffer.writeUInt32LE(length, 8);
  return buffer;
}

/** Returns a deterministic GLB 2.0 binary containing one triangle. */
export function triangleGlb() {
  const json = chunk(JSON_TYPE, Buffer.from(JSON.stringify(document())), 0x20);
  const bin = chunk(BIN_TYPE, positions(), 0);
  return Buffer.concat([header(12 + json.length + bin.length), json, bin]);
}
