#!/usr/bin/env python3
"""CLI: Yandex Wordstat API (Search API v2)."""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from scripts._env import load_env

load_env()

from wordstat.client import (  # noqa: E402
    DEFAULT_REGION_MOSCOW,
    discover_folder_id,
    get_api_key,
    get_folder_id,
    get_regions_tree,
    regions_distribution,
    top_requests,
)


def cmd_status() -> int:
    print("=== Yandex Wordstat API — статус подключения ===\n")
    try:
        key = get_api_key()
        print(f"API-ключ:     задан ({len(key)} символов)")
        folder = os.environ.get("YANDEX_FOLDER_ID", "").strip()
        if folder:
            print(f"folderId:     {folder} (из YANDEX_FOLDER_ID)")
        else:
            print("folderId:     определяется автоматически…")
            folder = discover_folder_id(key)
            print(f"folderId:     {folder} (обнаружен)")
        tree = get_regions_tree()
        n = len(tree.get("regions", []))
        print(f"Регионов:     {n} корневых узлов в дереве")
        print("\nПодключение к API: OK ✓")
        return 0
    except Exception as exc:
        print(f"Ошибка: {exc}", file=sys.stderr)
        return 1


def cmd_top(phrase: str, limit: int, region: str) -> int:
    data = top_requests(
        phrase,
        num_phrases=limit,
        regions=[region] if region else None,
    )
    print(f"=== Wordstat topRequests: «{phrase}» ===\n")
    print(f"totalCount: {data.get('totalCount', '—')}\n")
    print("Похожие запросы (results):")
    for i, row in enumerate(data.get("results", [])[:limit], 1):
        print(f"  {i:2}. {row.get('phrase')} — {row.get('count')}/мес")
    print("\nАссоциации (associations):")
    for i, row in enumerate(data.get("associations", [])[:10], 1):
        print(f"  {i:2}. {row.get('phrase')} — {row.get('count')}/мес")
    return 0


def cmd_regions(phrase: str) -> int:
    data = regions_distribution(phrase)
    print(f"=== Wordstat regions: «{phrase}» ===\n")
    rows = sorted(
        data.get("results", []),
        key=lambda r: int(r.get("count", 0) or 0),
        reverse=True,
    )[:15]
    for i, row in enumerate(rows, 1):
        print(
            f"  {i:2}. регион {row.get('region')} — "
            f"{row.get('count')} запр., affinity {row.get('affinityIndex')}"
        )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Yandex Wordstat API CLI")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("status", help="Проверить API-ключ и folderId")

    top = sub.add_parser("top", help="Топ запросов и ассоциации")
    top.add_argument("phrase", help="Ключевая фраза")
    top.add_argument("--limit", type=int, default=15, help="Число results")
    top.add_argument(
        "--region",
        default=DEFAULT_REGION_MOSCOW,
        help=f"ID региона (по умолчанию {DEFAULT_REGION_MOSCOW} — Москва)",
    )

    reg = sub.add_parser("regions", help="География запроса")
    reg.add_argument("phrase", help="Ключевая фраза")

    raw = sub.add_parser("raw", help="Сырой JSON-ответ topRequests")
    raw.add_argument("phrase")

    args = parser.parse_args()
    try:
        if args.cmd == "status":
            return cmd_status()
        if args.cmd == "top":
            return cmd_top(args.phrase, args.limit, args.region)
        if args.cmd == "regions":
            return cmd_regions(args.phrase)
        if args.cmd == "raw":
            print(json.dumps(top_requests(args.phrase), ensure_ascii=False, indent=2))
            return 0
    except Exception as exc:
        print(f"Ошибка: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
