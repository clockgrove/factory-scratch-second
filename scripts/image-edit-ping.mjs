import { deflateSync } from 'node:zlib';

const SIZE = 64;

/** Prints one stderr line, with the key masked and newlines collapsed, and exits 1. */
function fail(message, key) {
  let line = String(message).replace(/\s*\n\s*/g, ' ').trim();
  if (key) line = line.split(key).join('***');
  process.stderr.write(`image-edit-ping: ${line}\n`);
  process.exit(1);
}

/** Returns the CRC32 of a buffer as an unsigned integer. */
function crc32(buf) {
  let crc = 0xffffffff;
  for (const byte of buf) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/** Returns one PNG chunk (length, type, data, CRC) as a buffer. */
function chunk(type, data) {
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const head = Buffer.alloc(4);
  head.writeUInt32BE(data.length);
  const tail = Buffer.alloc(4);
  tail.writeUInt32BE(crc32(body));
  return Buffer.concat([head, body, tail]);
}

/** Builds a 64x64 solid red 8-bit RGB PNG in memory. */
function buildPng() {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(SIZE, 0);
  ihdr.writeUInt32BE(SIZE, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const row = Buffer.alloc(1 + SIZE * 3);
  for (let x = 0; x < SIZE; x++) row[1 + x * 3] = 255;
  const raw = Buffer.concat(Array.from({ length: SIZE }, () => row));
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/** Parses text as JSON, returning undefined when it is not JSON. */
function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

/** Returns the id's prefix up to and including its first "_" or "-", else its first 4 characters. */
function idPrefix(id) {
  const text = typeof id === 'string' ? id : String(id);
  const m = /[_-]/.exec(text);
  return m ? text.slice(0, m.index + 1) : text.slice(0, 4);
}

/** Returns the report lines for a response status, headers and parsed body. */
function report(response, body) {
  const plain = body !== null && typeof body === 'object' && !Array.isArray(body);
  const id = plain ? body.id : undefined;
  const gw = plain ? body.providerMetadata?.gateway : undefined;
  const gen = gw?.generationId;
  const names = [...new Set([...response.headers.keys()].map((n) => n.toLowerCase()))].sort();
  return [
    `status: ${response.status}`,
    `top-level keys: ${plain ? Object.keys(body).join(', ') : ''}`,
    id === undefined || id === null ? 'id: absent' : `id: present, prefix ${idPrefix(id)}`,
    gw === undefined || gw === null
      ? 'providerMetadata.gateway: absent'
      : `providerMetadata.gateway: present, cost ${String(gw.cost)}, generationId ${
          gen === undefined || gen === null || gen === '' ? 'absent' : 'present'
        }`,
    `headers: ${names.join(', ')}`,
    `x-generation-id: ${response.headers.has('x-generation-id') ? 'present' : 'absent'}`,
  ];
}

/** Sends one image edit through Factory's relay and prints the shape of the answer, never its image data. */
async function main() {
  const key = process.env.AI_GATEWAY_API_KEY;
  const url = process.env.FACTORY_GATEWAY_URL;
  if (!key) fail('missing AI_GATEWAY_API_KEY');
  if (!url) fail('missing FACTORY_GATEWAY_URL');
  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/v1/images/edits`, {
      method: 'POST',
      redirect: 'manual',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai/gpt-image-1-mini',
        prompt: 'Make the square blue.',
        images: [{ image_url: `data:image/png;base64,${buildPng().toString('base64')}` }],
        n: 1,
        size: '1024x1024',
        quality: 'low',
      }),
    });
    const body = parseJson(await response.text());
    process.stdout.write(`${report(response, body).join('\n')}\n`);
    if (!response.ok) process.exit(1);
  } catch (err) {
    fail(err?.message ?? err, key);
  }
}

await main();
