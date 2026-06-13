# krasdoska.ru — пайплайн статей «Крашеная доска»

Репозиторий для генерации SEO-статей бренда **[Крашеная доска](https://krashenayadoska.ru/)** (заводская покраска пиломатериалов в цеху) на базе [thruuu-claude-writer](https://github.com/thruuu/thruuu-claude-writer).

## Быстрый старт

1. Установите [Claude Code](https://docs.anthropic.com/en/docs/claude-code/getting-started)
2. Клонируйте репозиторий и откройте папку в терминале
3. Запустите `claude`
4. Скачайте бриф из [thruuu](https://thruuu.com) → положите в `briefs/`
5. В чате напишите **create article**

Голос бренда уже настроен в `GUIDELINE.md`. Дополнительный контекст — в `knowledge/`.

## Структура

| Файл / папка | Назначение |
|--------------|------------|
| `CLAUDE.md` | **Оркестратор** — координирует всех агентов (аналог `CLAUDE.MD` в [thruuu-claude-writer](https://github.com/thruuu/thruuu-claude-writer/blob/main/CLAUDE.MD)) |
| `.claude/agents/` | 6 специализированных агентов |
| `GUIDELINE.md` | Голос и правила бренда «Крашеная доска» |
| `GUIDELINE_MAKER.md` | Интервью для обновления `GUIDELINE.md` |
| `knowledge/` | Справочные материалы (бренд, продукты, GSC) |
| `gsc/` | Python-модуль Google Search Console API |
| `scripts/gsc_cli.py` | CLI: статус и топ запросов из GSC |
| `briefs/` | Брифы из thruuu |
| `drafts/` | Готовые черновики статей |

## Команды

- **create article** — запустить пайплайн по брифу из `briefs/`
- **create guideline** — обновить голос бренда через интервью

## Пайплайн агентов

```
researcher (×N) → head-of-research → writer → humanizer → linker → editor-in-chief
```

## Google Search Console API

```bash
pip install -r requirements.txt
python3 scripts/gsc_cli.py status      # проверка подключения
python3 scripts/gsc_cli.py queries     # топ запросов
python3 scripts/gsc_export.py          # экспорт в knowledge/gsc/
```

Настройка доступа: `knowledge/gsc-setup.md`. Переменные — в `.env.example`.

## Сайт

- Производство и каталог: https://krashenayadoska.ru/
- Направление: заводская покраска пиломатериалов на автоматизированной линии в цеху

## Лицензия

MIT (структура пайплайна — на основе thruuu-claude-writer).
