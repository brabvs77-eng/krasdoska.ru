#!/usr/bin/env python3
"""Единый экспорт SEO-данных: GSC + Wordstat → knowledge/."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from scripts._env import load_env

load_env()


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Экспорт GSC и Wordstat перед пайплайном статей",
    )
    parser.add_argument(
        "--brief",
        type=Path,
        help="Путь к брифу (для семян Wordstat)",
    )
    parser.add_argument(
        "--skip-gsc",
        action="store_true",
        help="Пропустить экспорт Google Search Console",
    )
    parser.add_argument(
        "--skip-wordstat",
        action="store_true",
        help="Пропустить экспорт Yandex Wordstat",
    )
    parser.add_argument(
        "--gsc-days",
        type=int,
        default=28,
        help="Период GSC в днях",
    )
    parser.add_argument(
        "--wordstat-max-phrases",
        type=int,
        default=8,
        help="Макс. семян Wordstat из брифа",
    )
    args = parser.parse_args()

    errors: list[str] = []
    ok: list[str] = []

    if not args.skip_gsc:
        try:
            from scripts.gsc_export import export as gsc_export

            path = gsc_export(days=args.gsc_days)
            ok.append(f"GSC → {path}")
        except Exception as exc:
            errors.append(f"GSC: {exc}")

    if not args.skip_wordstat:
        try:
            from scripts.wordstat_export import export as wordstat_export

            path = wordstat_export(
                brief=args.brief,
                max_phrases=args.wordstat_max_phrases,
            )
            ok.append(f"Wordstat → {path}")
        except Exception as exc:
            errors.append(f"Wordstat: {exc}")

    print("=== SEO export ===\n")
    for line in ok:
        print(f"✓ {line}")
    for line in errors:
        print(f"✗ {line}", file=sys.stderr)

    if not ok and errors:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
