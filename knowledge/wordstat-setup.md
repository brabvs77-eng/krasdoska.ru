# Подключение Yandex Wordstat API (Search API v2)

## Что это

Программный доступ к статистике поисковых запросов Яндекса — часть **Yandex Search API** в [AI Studio](https://aistudio.yandex.ru).

Базовый URL: `https://searchapi.api.cloud.yandex.net/v2/wordstat/`

Методы:
- `topRequests` — похожие запросы и ассоциации за 30 дней
- `dynamics` — динамика по времени
- `regions` — география
- `getRegionsTree` — справочник регионов

## Переменные окружения

```bash
YANDEX_SEARCH_API_KEY=...          # API-ключ из AI Studio (обязательно)
YANDEX_FOLDER_ID=b1g...            # ID папки Yandex Cloud (рекомендуется)
```

Если `YANDEX_FOLDER_ID` не задан, скрипт определит его автоматически через LLM API (по тексту ошибки сервисного аккаунта).

В Cloud Agent секрет `YANDEX_SEARCH_API_KEY` уже задан.

## Команды

```bash
pip install -r requirements.txt   # для GSC; Wordstat — только stdlib

# Проверка подключения
python3 scripts/wordstat_cli.py status

# Топ запросов по фразе (Москва, регион 213)
python3 scripts/wordstat_cli.py top "крашеная доска"

# Экспорт в knowledge/wordstat/ (семена из брифа)
python3 scripts/wordstat_export.py --brief briefs/my-brief.md

# GSC + Wordstat одной командой (перед пайплайном)
python3 scripts/seo_export.py --brief briefs/my-brief.md
```

## Использование в пайплайне

Оркестратор запускает `scripts/seo_export.py` **перед исследователями** (шаг 5b в `CLAUDE.md`).

Файлы в `knowledge/wordstat/` читает **head-of-research**:
- приоритетные ключи для Zipf и Top Topics
- реальная частотность Яндекса (дополняет thruuu и GSC)
- ассоциации — альтернативные формулировки (проверять релевантность)

## Квоты

Каждый вызов `topRequests` расходует дневную квоту. По умолчанию экспорт берёт до **8 семян** из брифа.

## Регион

По умолчанию **213** (Москва) — соответствует региону бренда «Крашеная доска».
