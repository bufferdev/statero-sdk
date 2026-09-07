# Statero Python SDK

```bash
# PyPI release coming soon
# pip install statero
```

## Usage

```python
import statero

statero.init(api_key="apm_xxx", host="https://api.statero.app")

statero.track(
    user_id="alice",
    model="gpt-4o",
    input_tokens=1000,
    output_tokens=500,
    provider="openai",
    feature="chat",
)

statero.flush()  # optionnel si auto_flush=True (défaut)
```

## Admin key vs user token

- **`apm_xxx`** — clé admin (backend SaaS, AI Profit Monitor)
- **`usr_{user_id}.{sig}`** — token user (apps clients, isolation par user)

Pour les apps clients, mint le token via `POST /v1/users/{id}/token` avec la clé admin.
