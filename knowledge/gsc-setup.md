# Подключение Google Search Console API

## Статус

API подключён через сервисный аккаунт. Email аккаунта:

```
gsc-claude@third-arcadia-499313-s2.iam.gserviceaccount.com
```

## Дать доступ к krashenayadoska.ru

Сейчас у аккаунта есть доступ только к другим свойствам. Чтобы работать с **krashenayadoska.ru**:

1. Откройте [Google Search Console](https://search.google.com/search-console)
2. Выберите свойство **krashenayadoska.ru** (или создайте его)
3. **Настройки** → **Пользователи и разрешения** → **Добавить пользователя**
4. Вставьте email сервисного аккаунта (см. выше)
5. Роль: **Полный** или **Ограниченный** (для чтения достаточно)

## Формат GSC_SITE_URL

Должен **точно совпадать** с форматом свойства в GSC:

| Тип в GSC | Значение `GSC_SITE_URL` |
|-----------|-------------------------|
| URL-prefix | `https://krashenayadoska.ru/` |
| Domain | `sc-domain:krashenayadoska.ru` |

## Переменные окружения

```bash
GSC_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'   # или путь к .json
GSC_SITE_URL=https://krashenayadoska.ru/
```

В Cloud Agent секрет `GSC_SERVICE_ACCOUNT_JSON` уже задан.

## Команды

```bash
pip install -r requirements.txt

# Проверка подключения
python3 scripts/gsc_cli.py status

# Топ запросов за 28 дней
python3 scripts/gsc_cli.py queries --days 28 --limit 20

# Экспорт в knowledge/gsc/ для пайплайна статей
python3 scripts/gsc_export.py
```

## Использование в пайплайне

Файлы в `knowledge/gsc/` (после `gsc_export.py` или `seo_export.py`) читаются агентом **head-of-research** как приоритетный контекст для SEO-статей: реальные запросы, страницы, CTR и позиции из GSC.

Перед пайплайном предпочтительно запускать `python3 scripts/seo_export.py --brief briefs/...` — вместе с Wordstat (см. `knowledge/wordstat-setup.md`).
