# krasdoska.ru

Репозиторий: **https://github.com/brabvs77-eng/krasdoska.ru**

Монорепозиторий проекта **[Крашеная доска](https://krashenayadoska.ru/)**:

| Часть | Каталог | Назначение |
|-------|---------|------------|
| **Сайт** | [`site/`](site/) | Миграция WordPress → Next.js (static export) |
| **SEO-пайплайн** | корень | Генерация статей через Claude Code + GSC |

---

## Сайт (Next.js)

Документация: [`docs/SITE-INVENTORY.md`](docs/SITE-INVENTORY.md), [`docs/REFACTOR-PLAN.md`](docs/REFACTOR-PLAN.md), [`docs/CLOUDFLARE-PAGES.md`](docs/CLOUDFLARE-PAGES.md).

```bash
cd site
npm install
npm run dev
```

### Деплой

| Ветка | Workflow | Куда |
|-------|----------|------|
| `develop` | `.github/workflows/preview.yml` | Cloudflare Pages |
| `main` | `.github/workflows/production.yml` | Основной сервер (после паритета) |
| любая | `.github/workflows/ci.yml` | Проверка сборки |

### Миграция контента

```powershell
.\scripts\migrate-content.ps1   # WXR → site/content/
.\scripts\sync-uploads.ps1      # extracted/uploads → site/public/uploads/
```

---

## SEO-пайплайн статей

На базе [thruuu-claude-writer](https://github.com/thruuu/thruuu-claude-writer).

1. Установите [Claude Code](https://docs.anthropic.com/en/docs/claude-code/getting-started)
2. Запустите `claude` в корне репозитория
3. Бриф из [thruuu](https://thruuu.com) → `briefs/`
4. В чате: **create article**

| Файл / папка | Назначение |
|--------------|------------|
| `CLAUDE.md` | Оркестратор агентов |
| `.claude/agents/` | Специализированные агенты |
| `GUIDELINE.md` | Голос и правила бренда |
| `knowledge/` | Справочные материалы, GSC |
| `gsc/` | Google Search Console API |
| `briefs/`, `drafts/` | Брифы и черновики |

```bash
pip install -r requirements.txt
python3 scripts/gsc_cli.py status
python3 scripts/gsc_cli.py queries
python3 scripts/gsc_export.py
```

Настройка GSC: `knowledge/gsc-setup.md`.

---

## Лицензия

MIT (структура SEO-пайплайна — на основе thruuu-claude-writer).
