#!/usr/bin/env python3
"""CLI: проверка подключения к Google Search Console API."""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from scripts._env import load_env

load_env()

from gsc.client import get_site_url, get_client, list_sites, query_search_analytics


def cmd_status() -> int:
    service = get_client()
    sites = list_sites(service)
    site_url = get_site_url()
    permitted = {s["siteUrl"] for s in sites}
    ok = site_url in permitted

    print("=== Google Search Console — статус подключения ===\n")
    print(f"Целевой сайт:     {site_url}")
    print(f"Доступных сайтов: {len(sites)}")
    print(f"Сайт в списке:    {'да ✓' if ok else 'нет ✗'}\n")

    if sites:
        print("Свойства GSC:")
        for s in sites:
            mark = " ← целевой" if s["siteUrl"] == site_url else ""
            print(f"  - {s['siteUrl']} ({s.get('permissionLevel', '?')}){mark}")
    else:
        print("Список свойств пуст.")
        print(
            "\nДобавьте email сервисного аккаунта в GSC:\n"
            "  Настройки → Пользователи и разрешения → Добавить пользователя\n"
            "  Роль: Полный или Ограниченный (достаточно для чтения)."
        )
        return 1

    if not ok:
        print(
            f"\n⚠ {site_url} не найден среди доступных свойств.\n"
            "Проверьте GSC_SITE_URL (URL-prefix должен совпадать точно, с https:// и /)."
        )
        return 1

    print("\nПодключение к API: OK ✓")
    return 0


def cmd_queries(days: int, limit: int) -> int:
    end = date.today() - timedelta(days=3)  # GSC data lag ~2-3 days
    start = end - timedelta(days=days - 1)
    rows = query_search_analytics(
        start.isoformat(),
        end.isoformat(),
        dimensions=["query"],
        row_limit=limit,
    )
    print(f"=== Топ запросов ({start} — {end}) ===\n")
    if not rows:
        print("Нет данных за период.")
        return 0
    for i, row in enumerate(rows, 1):
        q = row["keys"][0]
        clicks = row.get("clicks", 0)
        impr = row.get("impressions", 0)
        ctr = row.get("ctr", 0) * 100
        pos = row.get("position", 0)
        print(f"{i:2}. {q}")
        print(f"    клики: {clicks}  показы: {impr}  CTR: {ctr:.1f}%  позиция: {pos:.1f}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="GSC API CLI")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("status", help="Проверить подключение и список свойств")

    q = sub.add_parser("queries", help="Топ поисковых запросов")
    q.add_argument("--days", type=int, default=28, help="Период в днях (по умолчанию 28)")
    q.add_argument("--limit", type=int, default=20, help="Число строк")

    args = parser.parse_args()
    try:
        if args.cmd == "status":
            return cmd_status()
        if args.cmd == "queries":
            return cmd_queries(args.days, args.limit)
    except Exception as e:
        print(f"Ошибка: {e}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
