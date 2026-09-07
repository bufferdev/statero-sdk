/**
 * @statero/consent — Apple 5.1.2(i) AI consent for React Native apps.
 *
 * Usage:
 *   import { ConsentProvider, useConsent, logConsentToStatero } from "@statero/consent";
 */

let config = {
  apiKey: null,
  host: "https://api.statero.app",
};

const listeners = new Set();

export function initConsent({ apiKey, host = "https://api.statero.app" } = {}) {
  if (!apiKey) throw new Error("apiKey is required");
  config = { apiKey, host: host.replace(/\/$/, "") };
}

export function getConsentState() {
  return globalThis.__stateroConsent ?? { granted: false, providers: [] };
}

export function setConsentState(state) {
  globalThis.__stateroConsent = state;
  listeners.forEach((fn) => fn(state));
}

export function onConsentChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export async function logConsentToStatero({
  userId,
  action,
  providers,
  appId,
  platform = "ios",
}) {
  if (!config.apiKey) throw new Error("Call initConsent({ apiKey }) first");

  const res = await fetch(`${config.host}/v1/consent/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      action,
      providers,
      app_id: appId,
      platform,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Statero consent API ${res.status}: ${text}`);
  }
  return res.json();
}

export function useConsent() {
  throw new Error(
    "useConsent requires React. Import from '@statero/consent/react' in your RN app.",
  );
}

export function ConsentProvider() {
  throw new Error(
    "ConsentProvider requires React. Import from '@statero/consent/react' in your RN app.",
  );
}
