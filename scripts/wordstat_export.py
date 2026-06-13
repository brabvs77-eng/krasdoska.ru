#!/usr/bin/env python3
"""Экспорт данных Wordstat в knowledge/wordstat/ для пайплайна статей."""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from scripts._env import load_env

load_env()

from scripts.brief_keywords import extract_from_brief_file, extract_seed_phrases  # noqa: E402
from wordstat.client import DEFAULT_REGION_MOSCOW, get_folder_id, top_requests  # noqa: E402


def collect_phrases(
    brief: Path | None,
    extra: list[str],
    limit: int,
) -> list[str]:
    phrases: list[str] = []
    seen: set[str] = set()

    def add(raw: str) -> None:
        p = raw.strip()
        if not p:
            return
        key = p.lower()
        if key in seen:
            return
        seen.add(key)
        phrases.append(p)

    if brief and brief.is_file():
        for p in extract_from_brief_file(brief, limit=limit):
            add(p)
    for p in extra:
        add(p)
    if not phrases:
        add("крашеная доска")
    return phrases[:limit]


def export(
    *,
    brief: Path | None = None,
    phrases: list[str] | None = None,
    limit_per_phrase: int = 15,
    region: str = DEFAULT_REGION_MOSCOW,
    max_phrases: int = 8,
) -> Path:
    out_dir = ROOT / "knowledge" / "wordstat"
    out_dir.mkdir(parents=True, exist_ok=True)

    seed_phrases = phrases or collect_phrases(brief, [], max_phrases)
    folder_id = get_folder_id()
    results: list[dict] = []

    for phrase in seed_phrases:
        try:
            data = top_requests(
                phrase,
                num_phrases=limit_per_phrase,
                regions=[region],
            )
            results.append(
                {
                    "seed": phrase,
                    "totalCount": data.get("totalCount"),
                    "results": data.get("results", []),
                    "associations": data.get("associations", []),
                }
            )
        except Exception as exc:
            results.append({"seed": phrase, "error": str(exc)})

    md = [
        "# Wordstat — частотность запросов (Яндекс)",
        "",
        f"**Регион:** {region} (Москва)" if region == DEFAULT_REGION_MOSCOW else f"**Регион:** {region}",
        f"**folderId:** {folder_id}",
        f"**Сгенерировано:** {date.today().isoformat()}",
        "",
        "Данные за последние 30 дней. `count` — показов в месяц.",
        "",
    ]

    if brief:
        md.append(f"**Бриф:** `{brief.name}`")
        md.append("")

    for block in results:
        md.append(f"## Семя: «{block['seed']}»")
        md.append("")
        if block.get("error"):
            md.append(f"_Ошибка API: {block['error']}_")
            md.append("")
            continue
        md.append(f"**totalCount:** {block.get('totalCount', '—')}")
        md.append("")
        md.append("### Похожие запросы")
        md.append("")
        md.append("| Запрос | Показов/мес |")
        md.append("|--------|------------:|")
        for row in block.get("results", [])[:limit_per_phrase]:
            q = str(row.get("phrase", "")).replace("|", "\\|")
            md.append(f"| {q} | {row.get('count', '—')} |")
        md.append("")
        md.append("### Ассоциации")
        md.append("")
        md.append("| Запрос | Показов/мес |")
        md.append("|--------|------------:|")
        for row in block.get("associations", [])[:10]:
            q = str(row.get("phrase", "")).replace("|", "\\|")
            md.append(f"| {q} | {row.get('count', '—')} |")
        md.append("")

    out_md = out_dir / "wordstat-data.md"
    out_md.write_text("\n".join(md), encoding="utf-8")

    out_json = out_dir / "wordstat-data.json"
    out_json.write_text(
        json.dumps(
            {
                "region": region,
                "folderId": folder_id,
                "brief": brief.name if brief else None,
                "phrases": results,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    return out_md


def main() -> int:
    parser = argparse.ArgumentParser(description="Экспорт Wordstat в knowledge/wordstat/")
    parser.add_argument("--brief", type=Path, help="Путь к брифу из briefs/")
    parser.add_argument(
        "--phrases",
        help="Семена через запятую (если без брифа)",
    )
    parser.add_argument("--limit", type=int, default=15, help="Строк topRequests на фразу")
    parser.add_argument("--max-phrases", type=int, default=8, help="Макс. семян из брифа")
    parser.add_argument(
        "--region",
        default=DEFAULT_REGION_MOSCOW,
        help="ID региона Wordstat",
    )
    args = parser.parse_args()

    extra = [p.strip() for p in (args.phrases or "").split(",") if p.strip()]
    try:
        path = export(
            brief=args.brief,
            phrases=extra or None,
            limit_per_phrase=args.limit,
            region=args.region,
            max_phrases=args.max_phrases,
        )
        print(f"Экспортировано: {path}")
        return 0
    except Exception as exc:
        print(f"Ошибка: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
