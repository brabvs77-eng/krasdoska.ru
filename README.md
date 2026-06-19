# krashenayadoska.ru — миграция на Next.js

Рабочий каталог сайта: **[`site/`](site/)**

## Документация

- [`docs/SITE-INVENTORY.md`](docs/SITE-INVENTORY.md) — инвентаризация WordPress
- [`docs/REFACTOR-PLAN.md`](docs/REFACTOR-PLAN.md) — план рефакторинга и деплоя

## Быстрый старт

```bash
cd site
npm install
npm run dev
```

## Деплой

| Ветка | Workflow | Куда |
|-------|----------|------|
| `develop` | `.github/workflows/preview.yml` | Cloudflare Pages |
| `main` | `.github/workflows/production.yml` | Основной сервер (после паритета) |
| любая | `.github/workflows/ci.yml` | Проверка сборки |

## Миграция

```bash
cd site
npm run migrate:content   # WXR → content/
npm run sync:uploads      # extracted/uploads → public/uploads
```
