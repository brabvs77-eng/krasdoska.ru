#!/usr/bin/env python3
"""Экспорт данных GSC в knowledge/gsc/ для пайплайна статей."""

from __future__ import annotations

import json
import sys
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from scripts._env import load_env

load_env()

from gsc.client import get_site_url, query_search_analytics


def export(days: int = 28, limit: int = 50) -> Path:
    out_dir = ROOT / "knowledge" / "gsc"
    out_dir.mkdir(parents=True, exist_ok=True)

    end = date.today() - timedelta(days=3)
    start = end - timedelta(days=days - 1)
    period = f"{start.isoformat()} — {end.isoformat()}"

    queries = query_search_analytics(
        start.isoformat(), end.isoformat(),
        dimensions=["query"], row_limit=limit,
    )
    pages = query_search_analytics(
        start.isoformat(), end.isoformat(),
        dimensions=["page"], row_limit=limit,
    )

    md_lines = [
        "# GSC — поисковая аналитика",
        "",
        f"**Сайт:** {get_site_url()}",
        f"**Период:** {period}",
        f"**Сгенерировано:** {date.today().isoformat()}",
        "",
        "## Топ запросов",
        "",
        "| Запрос | Клики | Показы | CTR | Позиция |",
        "|--------|------:|-------:|----:|--------:|",
    ]
    for row in queries:
        q = row["keys"][0].replace("|", "\\|")
        md_lines.append(
            f"| {q} | {row.get('clicks', 0)} | {row.get('impressions', 0)} "
            f"| {row.get('ctr', 0)*100:.1f}% | {row.get('position', 0):.1f} |"
        )

    md_lines += ["", "## Топ страниц", "", "| Страница | Клики | Показы | CTR | Позиция |", "|----------|------:|-------:|----:|--------:|"]
    for row in pages:
        p = row["keys"][0].replace("|", "\\|")
        md_lines.append(
            f"| {p} | {row.get('clicks', 0)} | {row.get('impressions', 0)} "
            f"| {row.get('ctr', 0)*100:.1f}% | {row.get('position', 0):.1f} |"
        )

    out_md = out_dir / "search-analytics.md"
    out_md.write_text("\n".join(md_lines) + "\n", encoding="utf-8")

    out_json = out_dir / "search-analytics.json"
    out_json.write_text(
        json.dumps(
            {"site": get_site_url(), "period": period, "queries": queries, "pages": pages},
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    return out_md


def main() -> int:
    try:
        path = export()
        print(f"Экспортировано: {path}")
        return 0
    except Exception as e:
        print(f"Ошибка: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
