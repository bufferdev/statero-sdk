# @statero/consent

React Native consent SDK for Apple App Store guideline 5.1.2(i).

## Before you install

1. [Sign up](https://statero.app/sign-up) → create an app → copy `apm_...`
2. Add to `.npmrc`:

```
@statero:registry=https://api.statero.app/npm/
//api.statero.app/npm/:_authToken=apm_your_key
```

```bash
npm install @statero/consent
```

## Usage

```javascript
import { initConsent } from "@statero/consent";
import { useConsent, ConsentProvider } from "@statero/consent/react";

initConsent({ apiKey: "apm_..." });

function App() {
  return (
    <ConsentProvider>
      <YourApp />
    </ConsentProvider>
  );
}

function Settings() {
  const { granted, grant, revoke } = useConsent();
  // grant(["openai"], { userId: "user_123", appId: "com.example.app" })
}
```

Consent events are stored on Statero for App Review export via `GET /v1/consent/events`.
