"""Google Search Console API client."""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
DEFAULT_SITE_URL = "https://krashenayadoska.ru/"


def _load_credentials_info() -> dict[str, Any]:
    raw = os.environ.get("GSC_SERVICE_ACCOUNT_JSON", "").strip()
    if not raw:
        raise RuntimeError(
            "GSC_SERVICE_ACCOUNT_JSON не задан. "
            "Укажите JSON сервисного аккаунта в переменной окружения или в .env."
        )

    # JSON inline (Cloud Agent secrets, .env)
    if raw.startswith("{"):
        return json.loads(raw)

    path = Path(raw)
    if path.is_file():
        return json.loads(path.read_text(encoding="utf-8"))

    raise RuntimeError(
        "GSC_SERVICE_ACCOUNT_JSON: ожидается JSON-объект или путь к файлу .json"
    )


def get_site_url() -> str:
    return os.environ.get("GSC_SITE_URL", DEFAULT_SITE_URL).strip()


def get_client(readonly: bool = True):
    """Build authenticated Search Console API v3 service."""
    scope = SCOPES if readonly else ["https://www.googleapis.com/auth/webmasters"]
    creds = service_account.Credentials.from_service_account_info(
        _load_credentials_info(),
        scopes=scope,
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def list_sites(service=None) -> list[dict[str, Any]]:
    """Return all GSC properties accessible to the service account."""
    service = service or get_client()
    response = service.sites().list().execute()
    return response.get("siteEntry", [])


def query_search_analytics(
    start_date: str,
    end_date: str,
    *,
    dimensions: list[str] | None = None,
    row_limit: int = 25,
    site_url: str | None = None,
    service=None,
) -> list[dict[str, Any]]:
    """
    Fetch Search Analytics rows.

    Dates: YYYY-MM-DD. Dimensions: query, page, country, device, date, etc.
    """
    service = service or get_client()
    site = site_url or get_site_url()
    body: dict[str, Any] = {
        "startDate": start_date,
        "endDate": end_date,
        "rowLimit": row_limit,
    }
    if dimensions:
        body["dimensions"] = dimensions

    response = (
        service.searchanalytics()
        .query(siteUrl=site, body=body)
        .execute()
    )
    return response.get("rows", [])
