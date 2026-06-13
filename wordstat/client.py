"""Yandex Search API — Wordstat client."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from typing import Any

API_BASE = "https://searchapi.api.cloud.yandex.net/v2/wordstat"
LLM_COMPLETION_URL = (
    "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
)
DEFAULT_REGION_MOSCOW = "213"


def get_api_key() -> str:
    key = os.environ.get("YANDEX_SEARCH_API_KEY", "").strip()
    if not key:
        raise RuntimeError(
            "YANDEX_SEARCH_API_KEY не задан. "
            "Укажите API-ключ Yandex AI Studio в переменной окружения или в .env."
        )
    return key


def discover_folder_id(api_key: str | None = None) -> str:
    """Resolve folder ID via LLM API error message (service account folder)."""
    key = api_key or get_api_key()
    body = json.dumps(
        {
            "modelUri": "gpt://test/yandexgpt/latest",
            "completionOptions": {
                "stream": False,
                "temperature": 0.1,
                "maxTokens": "10",
            },
            "messages": [{"role": "user", "text": "hi"}],
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        LLM_COMPLETION_URL,
        data=body,
        headers={
            "Authorization": f"Api-Key {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            resp.read()
    except urllib.error.HTTPError as exc:
        payload = json.loads(exc.read().decode("utf-8"))
        message = payload.get("error", {}).get("message", "")
        marker = "service account folder ID '"
        if marker in message:
            start = message.index(marker) + len(marker)
            end = message.index("'", start)
            return message[start:end]
        raise RuntimeError(
            f"Не удалось определить folderId: {message or exc}"
        ) from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Сеть недоступна при определении folderId: {exc}") from exc

    raise RuntimeError("Не удалось определить folderId: неожиданный ответ LLM API")


def get_folder_id() -> str:
    folder = os.environ.get("YANDEX_FOLDER_ID", "").strip()
    if folder:
        return folder
    return discover_folder_id()


def call_wordstat(path: str, body: dict[str, Any]) -> dict[str, Any]:
    """POST to Wordstat endpoint; body gets folderId if missing."""
    key = get_api_key()
    payload = dict(body)
    payload.setdefault("folderId", get_folder_id())

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{API_BASE}/{path}",
        data=data,
        headers={
            "Authorization": f"Api-Key {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(
            f"Wordstat API {path} HTTP {exc.code}: {detail}"
        ) from exc


def top_requests(
    phrase: str,
    *,
    num_phrases: int = 20,
    regions: list[str] | None = None,
    devices: list[str] | None = None,
) -> dict[str, Any]:
    body: dict[str, Any] = {"phrase": phrase, "numPhrases": num_phrases}
    if regions:
        body["regions"] = regions
    if devices:
        body["devices"] = devices
    return call_wordstat("topRequests", body)


def dynamics(
    phrase: str,
    *,
    period: str = "PERIOD_MONTHLY",
    from_date: str,
    to_date: str | None = None,
    regions: list[str] | None = None,
) -> dict[str, Any]:
    body: dict[str, Any] = {
        "phrase": phrase,
        "period": period,
        "fromDate": from_date,
    }
    if to_date:
        body["toDate"] = to_date
    if regions:
        body["regions"] = regions
    return call_wordstat("dynamics", body)


def regions_distribution(
    phrase: str,
    *,
    region: str = "REGION_REGIONS",
    devices: list[str] | None = None,
) -> dict[str, Any]:
    body: dict[str, Any] = {"phrase": phrase, "region": region}
    if devices:
        body["devices"] = devices
    return call_wordstat("regions", body)


def get_regions_tree() -> dict[str, Any]:
    return call_wordstat("getRegionsTree", {})
