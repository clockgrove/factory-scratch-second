import { pathToFileURL } from 'node:url';

const GATEWAY_ENDPOINT = 'https://ai-gateway.vercel.sh/v1/chat/completions';
const GATEWAY_BODY = {
  model: 'mistral/mistral-nemo',
  messages: [{ role: 'user', content: 'Say ok' }],
  max_tokens: 5,
};
const TIMEOUT_MS = 15000;
const KEYS = ['AI_GATEWAY_API_KEY', 'ANTHROPIC_API_KEY', 'CLAUDE_CODE_OAUTH_TOKEN'];

/** Performs one request and returns its status code, or null when it fails before any response. */
async function statusOf(url, init, fetchImpl) {
  let res;
  try {
    res = await fetchImpl(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch {
    return null;
  }
  const status = res.status;
  try {
    await res.body?.cancel();
  } catch {}
  return status;
}

/** Returns the gateway status line, making no request when the key is unset or empty. */
export async function gatewayLine(env, fetchImpl = fetch) {
  const key = env.AI_GATEWAY_API_KEY;
  if (!key) return 'gateway status no-key';
  const status = await statusOf(
    GATEWAY_ENDPOINT,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(GATEWAY_BODY),
      redirect: 'manual',
    },
    fetchImpl,
  );
  return status === null ? 'gateway status refused' : `gateway status ${status}`;
}

/** Returns the status line for one unauthenticated GET of the url, labelled with the host name. */
export async function hostLine(label, url, fetchImpl = fetch) {
  const status = await statusOf(url, { method: 'GET', redirect: 'manual' }, fetchImpl);
  return status === null ? `${label} refused` : `${label} status ${status}`;
}

/** Returns one present/absent line per credential variable, never including values. */
export function presenceLines(env) {
  return KEYS.map((name) => `${name} ${env[name] ? 'present' : 'absent'}`);
}

/** Returns all six output lines, running the requests sequentially and never throwing. */
export async function shellChecks(env, fetchImpl = fetch) {
  const lines = [];
  const safe = async (fn, fallback) => {
    try {
      return await fn();
    } catch {
      return fallback;
    }
  };
  lines.push(await safe(() => gatewayLine(env, fetchImpl), 'gateway status refused'));
  lines.push(
    await safe(() => hostLine('api.github.com', 'https://api.github.com/zen', fetchImpl), 'api.github.com refused'),
  );
  lines.push(
    await safe(() => hostLine('example.com', 'https://example.com/', fetchImpl), 'example.com refused'),
  );
  lines.push(...presenceLines(env));
  return lines;
}

/** Prints the six lines and always exits with code 0. */
async function main() {
  const lines = await shellChecks(process.env);
  console.log(lines.join('\n'));
  process.exitCode = 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
