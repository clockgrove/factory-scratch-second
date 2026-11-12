import { createGateway, generateText } from 'ai';

const MODEL = 'nvidia/nemotron-3.5-lightning-free';
const PROMPT = 'Say ok.';

/** Prints one stderr line, with the key masked, ANSI colour escapes stripped and newlines collapsed, and exits 1. */
function fail(message, key, status) {
  let line = String(message)
    .replace(/\u001b\[[0-9;]*m/g, '')
    .replace(/\s*\n\s*/g, ' ')
    .trim();
  if (key) line = line.split(key).join('***');
  if (status) line += ` (HTTP ${status})`;
  process.stderr.write(`gateway-ping-c5: ${line}\n`);
  process.exit(1);
}

/** Sends the one prompt through Factory's relay and prints the answer's text and gateway cost. */
async function main() {
  const key = process.env.AI_GATEWAY_API_KEY;
  const url = process.env.FACTORY_GATEWAY_URL;
  if (!key) fail('missing AI_GATEWAY_API_KEY');
  if (!url) fail('missing FACTORY_GATEWAY_URL');
  try {
    const gateway = createGateway({
      apiKey: process.env.AI_GATEWAY_API_KEY,
      baseURL: `${process.env.FACTORY_GATEWAY_URL.replace(/\/$/, '')}/v4/ai`,
    });
    const result = await generateText({ model: gateway(MODEL), prompt: PROMPT });
    const cost = result.providerMetadata?.gateway?.cost;
    process.stdout.write(`text: ${result.text}\ncost: ${cost}\n`);
  } catch (err) {
    const status =
      err?.statusCode ??
      err?.cause?.statusCode ??
      err?.lastError?.statusCode ??
      (err?.name === 'GatewayAuthenticationError' ? 401 : undefined);
    fail(err?.message ?? err, key, status);
  }
}

await main();
