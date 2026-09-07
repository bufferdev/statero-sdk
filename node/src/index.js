let config = {
  apiKey: null,
  host: "https://api.statero.app",
  timeout: 30000,
};

const pending = [];

export function init({ apiKey, host = "https://api.statero.app", timeout = 30000 } = {}) {
  if (!apiKey) throw new Error("apiKey is required");
  config = { apiKey, host: host.replace(/\/$/, ""), timeout };
}

export async function track({
  userId,
  model,
  inputTokens,
  outputTokens,
  provider = "openai",
  feature = "chat",
  inputCostUsd,
  outputCostUsd,
  tags,
  flushNow = false,
}) {
  const payload = {
    user_id: userId,
    model,
    provider,
    feature,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
  };
  if (inputCostUsd != null) payload.input_cost_usd = inputCostUsd;
  if (outputCostUsd != null) payload.output_cost_usd = outputCostUsd;
  if (tags) payload.tags = tags;

  if (flushNow) return send(payload);

  pending.push(payload);
  return { status: "queued", queued: pending.length };
}

export async function flush() {
  const batch = pending.splice(0, pending.length);
  return Promise.all(batch.map(send));
}

async function send(payload) {
  if (!config.apiKey) throw new Error("Call init({ apiKey }) first");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeout);

  try {
    const res = await fetch(`${config.host}/v1/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Statero API ${res.status}: ${text}`);
    }
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}
