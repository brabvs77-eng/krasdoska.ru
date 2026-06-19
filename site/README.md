# krashenayadoska.ru — Next.js

Статический сайт на **Next.js 15** (App Router, `output: 'export'`).

## Быстрый старт

```bash
cd site
npm install
npm run dev
```

Открыть http://localhost:3000

## Сборка

```bash
npm run build   # результат в out/
```

## Миграция контента

```bash
# JSON из WXR (файл в корне репозитория)
npm run migrate:content

# Медиа из extracted/uploads (после extract-wpress.ps1)
npm run sync:uploads
```

## Структура

- `app/` — маршруты (slug как на WordPress)
- `components/` — UI
- `content/` — JSON-контент
- `lib/` — типы, настройки, metadata
- `public/` — статика

## Деплой

| Ветка | Куда |
|-------|------|
| `develop` | Cloudflare Pages (GitHub Actions) |
| `main` | Основной сервер (после паритета, `production.yml`) |

### Секреты GitHub

**Cloudflare Pages:** `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

**Production SSH:** `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`

## Документация

- `../docs/SITE-INVENTORY.md` — инвентаризация WP
- `../docs/REFACTOR-PLAN.md` — план миграции
