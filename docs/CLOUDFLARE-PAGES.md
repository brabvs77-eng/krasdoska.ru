# Cloudflare Pages — превью-деплой

Статический билд Next.js (`output: 'export'`) деплоится на **Cloudflare Pages** из ветки `develop`.

## Настройки проекта в CF Dashboard

| Параметр | Значение |
|----------|----------|
| Root directory | `site` |
| Build command | `npm install && npm run build` |
| Build output directory | `out` |
| Node.js version | `20` |
| Framework preset | **None** (не Next.js SSR) |

## GitHub Actions (`.github/workflows/preview.yml`)

При push в `develop` workflow:

1. `npm ci` в `site/`
2. `npm run build` → каталог `site/out/`
3. `wrangler pages deploy out` на проект Pages

### Секреты репозитория

| Secret | Описание |
|--------|----------|
| `CLOUDFLARE_API_TOKEN` | API token с правами Pages Edit |
| `CLOUDFLARE_ACCOUNT_ID` | ID аккаунта Cloudflare |

## Локальная подготовка перед push

```powershell
# Миграция контента из WXR
.\scripts\migrate-content.ps1

# Копирование медиа (не коммитится — в .gitignore)
.\scripts\sync-uploads.ps1
```

Медиа `site/public/uploads/` синхронизируются на CI отдельно или через R2/внешний CDN на этапе staging (сейчас — локальный sync перед деплоем).

## Проверка после деплоя

- [ ] Главная `/` открывается
- [ ] Каталог `/katalog/` и категории
- [ ] Блог `/blog/`, проекты `/project/`
- [ ] Trailing slash (`/katalog/vagonka/`)
- [ ] Изображения из `/uploads/` (если sync выполнен)

## Переход на продакшен

После визуального и SEO-паритета — merge `develop` → `main`, включить `production.yml` (`if: false` → убрать) для SSH-деплоя на основной сервер.
