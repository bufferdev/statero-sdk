# Statero SDK

Official SDKs for [Statero](https://statero.app) — track AI costs, calculate profit per user, and ship Apple-compliant consent.

## Before you install

1. [Sign up](https://statero.app/sign-up) on Statero
2. Console → **New app** → copy your `apm_...` API key

You need that key to use the SDK (and for the recommended install flow below).

## Packages

| Package | Install | Description |
|---------|---------|-------------|
| [`@statero/sdk`](./node) | see below | Node.js / serverless — track token usage |
| [`@statero/consent`](./consent) | see below | React Native — Apple 5.1.2(i) consent UI |
| [`statero`](./python) | PyPI coming soon | Python backend SDK |

## Install (recommended)

Add to `.npmrc` in your project (use your real `apm_` key):

```
@statero:registry=https://api.statero.app/npm/
//api.statero.app/npm/:_authToken=apm_your_key
```

Then:

```bash
npm install @statero/sdk
```

## Quick start (Node.js)

```javascript
import { init, track, flush } from "@statero/sdk";

init({ apiKey: "apm_...", host: "https://api.statero.app" });

await track({
  userId: "user_123",
  model: "gpt-4o",
  provider: "openai",
  inputTokens: 1000,
  outputTokens: 500,
  flushNow: true,
});
```

## Docs

- Console: https://statero.app/dashboard/docs
- API: https://api.statero.app
- Source: https://github.com/bufferdev/statero-sdk

## Publish (maintainers)

```bash
./scripts/publish-npm.sh
```

## License

MIT — see [LICENSE](./LICENSE).
