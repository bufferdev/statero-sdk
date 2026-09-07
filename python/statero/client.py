from __future__ import annotations

import atexit
from typing import Any

import httpx

_config: dict[str, Any] = {
    "api_key": None,
    "host": "https://api.statero.app",
    "timeout": 30.0,
}
_client: httpx.Client | None = None
_pending: list[dict] = []
_auto_flush = True


def init(
    api_key: str,
    *,
    host: str = "https://api.statero.app",
    timeout: float = 30.0,
    auto_flush: bool = True,
) -> None:
    global _client, _auto_flush
    _config["api_key"] = api_key
    _config["host"] = host.rstrip("/")
    _config["timeout"] = timeout
    _auto_flush = auto_flush
    if _client:
        _client.close()
    _client = httpx.Client(timeout=timeout)
    if auto_flush:
        atexit.register(flush)


def _headers() -> dict[str, str]:
    if not _config["api_key"]:
        raise RuntimeError("Call statero.init(api_key=...) first")
    return {
        "Authorization": f"Bearer {_config['api_key']}",
        "Content-Type": "application/json",
    }


def track(
    *,
    user_id: str,
    model: str,
    input_tokens: int,
    output_tokens: int,
    provider: str = "openai",
    feature: str = "chat",
    input_cost_usd: float | None = None,
    output_cost_usd: float | None = None,
    tags: list[str] | None = None,
    flush_now: bool = False,
) -> dict:
    payload = {
        "user_id": user_id,
        "model": model,
        "provider": provider,
        "feature": feature,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
    }
    if input_cost_usd is not None:
        payload["input_cost_usd"] = input_cost_usd
    if output_cost_usd is not None:
        payload["output_cost_usd"] = output_cost_usd
    if tags:
        payload["tags"] = tags

    if flush_now:
        return _send(payload)

    _pending.append(payload)
    return {"status": "queued", "queued": len(_pending)}


def flush() -> list[dict]:
    global _pending
    if not _pending:
        return []
    batch, _pending = _pending, []
    results = [_send(p) for p in batch]
    return results


def _send(payload: dict) -> dict:
    client = _client or httpx.Client(timeout=_config["timeout"])
    response = client.post(
        f"{_config['host']}/v1/events",
        headers=_headers(),
        json=payload,
    )
    response.raise_for_status()
    return response.json()
