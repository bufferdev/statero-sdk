# @statero/sdk

Track AI usage and costs with Statero.

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
