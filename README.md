# Statero SDK

Official SDKs for [Statero](https://statero.app) — track AI costs, calculate profit per user, and ship Apple-compliant consent.

## Packages

| Package | Install | Description |
|---------|---------|-------------|
| [`@statero/sdk`](./node) | `npm install @statero/sdk` | Node.js / serverless — track token usage |
| [`@statero/consent`](./consent) | `npm install @statero/consent` | React Native — Apple 5.1.2(i) consent UI |
| [`statero`](./python) | PyPI coming soon | Python backend SDK |

## Quick start (Node.js)

```bash
npm install @statero/sdk
```

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

- Console: https://app.statero.app/dashboard/docs
- API: https://api.statero.app

## Publish (maintainers)

```bash
./scripts/publish-npm.sh
```

## License

MIT — see [LICENSE](./LICENSE).
