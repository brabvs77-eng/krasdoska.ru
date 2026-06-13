"""Extract seed keywords from thruuu brief markdown files."""

from __future__ import annotations

import re
from pathlib import Path


def _clean_phrase(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[*_`#>|]", "", text)
    text = re.sub(r"\s+", " ", text).strip(" -–—•\t")
    return text.strip()


def _add(phrases: list[str], seen: set[str], raw: str, *, min_len: int = 3) -> None:
    phrase = _clean_phrase(raw)
    if len(phrase) < min_len:
        return
    key = phrase.lower()
    if key in seen:
        return
    seen.add(key)
    phrases.append(phrase)


def extract_seed_phrases(brief_text: str, *, limit: int = 8) -> list[str]:
    """
    Pull SEO seed phrases from a thruuu brief.

    Priority: Article Summary title → Top Topics → Content Outline headings
    → Frequent Questions (first words) → Related Search.
    """
    phrases: list[str] = []
    seen: set[str] = set()

    title_match = re.search(
        r"(?:^|\n)\s*(?:title|заголовок)\s*[:：]\s*(.+)$",
        brief_text,
        re.IGNORECASE | re.MULTILINE,
    )
    if title_match:
        _add(phrases, seen, title_match.group(1))

    in_top_topics = False
    in_outline = False
    in_questions = False
    in_related = False

    for line in brief_text.splitlines():
        stripped = line.strip()
        lower = stripped.lower()

        if re.match(r"^#+\s*top topics\b", lower) or lower.startswith("top topics"):
            in_top_topics, in_outline, in_questions, in_related = True, False, False, False
            continue
        if re.match(r"^#+\s*content outline\b", lower) or lower.startswith("content outline"):
            in_top_topics, in_outline, in_questions, in_related = False, True, False, False
            continue
        if re.match(r"^#+\s*frequent questions\b", lower) or lower.startswith("frequent questions"):
            in_top_topics, in_outline, in_questions, in_related = False, False, True, False
            continue
        if re.match(r"^#+\s*related search\b", lower) or lower.startswith("related search"):
            in_top_topics, in_outline, in_questions, in_related = False, False, False, True
            continue
        if stripped.startswith("#") and not any(
            kw in lower
            for kw in ("top topic", "content outline", "frequent question", "related search")
        ):
            in_top_topics = in_outline = in_questions = in_related = False

        if in_top_topics and stripped.startswith(("-", "*", "•")):
            _add(phrases, seen, stripped.lstrip("-*• ").split("—")[0].split("-")[0])

        if in_outline:
            heading = re.match(r"^#{2,4}\s+(.+)$", stripped)
            if heading:
                _add(phrases, seen, heading.group(1))

        if in_questions and stripped.startswith(("-", "*", "•", "?")):
            q = stripped.lstrip("-*•? ").split("?")[0]
            if len(q.split()) <= 6:
                _add(phrases, seen, q)

        if in_related and stripped.startswith(("-", "*", "•")):
            _add(phrases, seen, stripped.lstrip("-*• "))

    return phrases[:limit]


def extract_from_brief_file(path: Path, *, limit: int = 8) -> list[str]:
    text = path.read_text(encoding="utf-8")
    seeds = extract_seed_phrases(text, limit=limit)
    if seeds:
        return seeds
    # Fallback: first H1/H2 in file
    for line in text.splitlines():
        m = re.match(r"^#{1,2}\s+(.+)$", line.strip())
        if m:
            phrase = _clean_phrase(m.group(1))
            if len(phrase) >= 3:
                return [phrase]
    return ["крашеная доска"]
