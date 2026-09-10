# @statero/sdk

Track AI usage and costs with Statero.

## Before you install

1. [Sign up](https://statero.app/sign-up) → create an app → copy `apm_...`
2. Add to `.npmrc`:

```
@statero:registry=https://api.statero.app/npm/
//api.statero.app/npm/:_authToken=apm_your_key
```

```bash
npm install @statero/sdk
```

## Usage

```javascript
import { init, track, flush } from "@statero/sdk";

init({ apiKey: "apm_xxx", host: "https://api.statero.app" });

await track({
  userId: "user_123",
  model: "gpt-4o",
  provider: "openai",
  inputTokens: 1000,
  outputTokens: 500,
});

await flush();
```

## Docs

https://statero.app/dashboard/docs
