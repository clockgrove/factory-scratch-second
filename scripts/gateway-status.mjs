import { pathToFileURL } from 'node:url';

const ENDPOINT = 'https://ai-gateway.vercel.sh/v1/chat/completions';
const BODY = {
  model: 'mistral/mistral-nemo',
  messages: [{ role: 'user', content: 'Say ok' }],
  max_tokens: 5,
};

/** Sends the single probe request and returns the response, letting fetch errors propagate. */
function probe(key, fetchImpl) {
  return fetchImpl(ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(BODY),
  });
}

/** Returns the one status line for the given environment, never throwing and never including secrets. */
export async function statusLine(env, fetchImpl = fetch) {
  const key = env.AI_GATEWAY_API_KEY;
  if (!key) return 'gateway status no-key';
  let res;
  try {
    res = await probe(key, fetchImpl);
  } catch {
    return 'gateway status refused';
  }
  const line = `gateway status ${res.status}`;
  try {
    await res.body?.cancel();
  } catch {}
  return line;
}

/** Prints the status line and always exits with code 0. */
async function main() {
  let line;
  try {
    line = await statusLine(process.env);
  } catch {
    line = 'gateway status refused';
  }
  console.log(line);
  process.exitCode = 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
