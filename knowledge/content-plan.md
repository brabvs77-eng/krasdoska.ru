# Контент-план — krashenayadoska.ru

**Дата:** 2026-09-16 (обновлено)  
**Сайт:** [krashenayadoska.ru](https://krashenayadoska.ru/)  
**Связанные документы:** [`docs/SEO-PLAN.md`](../docs/SEO-PLAN.md), [`docs/blog-redirects.md`](../docs/blog-redirects.md), [`knowledge/brand.md`](brand.md), [`GUIDELINE.md`](../GUIDELINE.md)

> **Статус:** фазы 1–5 блога **закрыты** (57 статей в `site/content/blog/`). Этап 2 SEO-плана выполнен с запасом. Фокус смещён на **этап 3** (коммерческие лендинги) и **фазу 6** (точечный рост + обновление legacy-контента).

---

## 1. Анализ текущего состояния

### 1.1 Инвентаризация контента

| Тип | Кол-во | Статус |
|-----|-------:|--------|
| Статьи блога (`site/content/blog/`) | **62** | Опубликованы (фазы 1–6 + P1) |
| Брифы (`docs/briefs/`) | **40** | Все реализованы в блоге |
| Legacy-статьи (миграция WP, без брифа) | **17** | Редиректы настроены; текст не проходил пайплайн |
| Категории каталога | **9** | Контент из WP; часть усилена (планкен — цены в description) |
| Коммерческие лендинги (корневые) | **9+** | Частично усилены |
| Спец. лендинги Next.js | **2** | `/proizvodstvo-istra/`, `/zavodskaya-pokraska/` — готовы |
| Страницы услуг | **3** | Покраска, масло/воск, реставрация — есть |
| Проекты (портфолио) | **10** | Без SEO-описаний и кейс-брифов |
| Страницы палитры | **5** | RAL, NCS, Biofa, Osmo, общая |

### 1.2 Что изменилось относительно плана 2026-07

| Было в плане | Факт сейчас | Оценка |
|--------------|-------------|--------|
| 16 дублей → 10 канонов | 14 старых slug → 301; **57 уникальных URL** | ✅ Дубли сняты, объём вырос |
| Очередь из 10 статей P0 | **40 статей** через thruuu-пайплайн | ✅ Кластеры закрыты шире |
| Пустые `brend`, `dostavka-v-regiony` | Заполнены | ✅ |
| Ритм 2 статьи/нед | 40 статей за ~7 дней (август) | ⚠️ Пакетный выпуск; дальше — умеренный ритм |
| GSC → приоритеты | GSC API не подключён в среде | ❌ Нужна настройка `knowledge/gsc-setup.md` |

### 1.3 Покрытие кластеров запросов

| Кластер | Интент | Канон URL | Покрытие блогом | Покрытие коммерцией | Приоритет доработки |
|---------|--------|-----------|-----------------|---------------------|---------------------|
| крашеная доска (бренд) | бренд | `/` | `brend`, `kachestvo-proverennoe-vremenem` | Главная (seo в JSON) | P1 — переписать body главной |
| крашеная вагонка | коммерция | `/katalog/krashenaja-vagonka/` | `krashenaya-vagonka-kak-vybrat` | Категория WP | P0 — шаблон B2 |
| крашеный планкен | коммерция | `/katalog/planken/` | 6+ статей (фасад, лиственница, кейсы) | Категория усилена | P0 — FAQ + schema |
| имитация бруса | коммерция | `/katalog/krashenaja-imitacija-brusa/` | 4 статьи | Категория WP | P0 |
| фасад / планкен фасад | коммерция + инфо | `/katalog/fasadnaja-doska/` | `pokraska-fasada-doma-poshagovo`, кейсы | Категория WP | P1 |
| заводская покраска | услуга / УТП | `/zavodskaya-pokraska/` | `chto-vygodnee-krasit-samomu...` | ✅ Лендинг готов | P2 — перелинковка |
| производство Истра | локаль | `/proizvodstvo-istra/` | `dostavka-v-regiony` | ✅ Лендинг готов | P2 |
| доставка + гео | локаль / логистика | `/blog/dostavka-v-regiony/` | **18 городов** + хаб | — | P1 — мониторинг дублей |
| Sirca / технология | доверие | `/tehnologija-nanesenija-kraski/` | `oficialnyy-diler-sirca`, `shemy-pokraski-sirca` | Страница технологии | P2 |
| масло/воск, реставрация | услуга | `/nanesenie-masla-i-voska/`, `/restavracija-derevyannyh-poverhnostej/` | `restavratsiya-vs-pokraska-s-nulya`, `terrasnaya-doska-maslo-talatu-vs-kraska` | Страницы есть | P1 — FAQ |
| терраса / скандинавская / паркет | коммерция | корневые лендинги | По 1–2 статьи | Категории WP | P1 |
| B2B (строители, дизайнеры) | коммерция | `/katalog/` | `krashenaya-doska-dlya-stroiteley-i-dizaynerov` | — | P2 |

### 1.4 Выявленные проблемы

1. **Региональная серия (18 статей)** — общий шаблон; отличаются расстояние, климат и локальный абзац. Риск «thin content» при массовой индексации. **Действие:** не плодить новые города без GSC-сигнала; через 60 дней — сверка показов/кликов.
2. **17 legacy-статей** — мигрированы с WP, не проходили writer/humanizer. Часть пересекается с новыми канонами по теме.
3. **Коммерческие категории** — длинный HTML из Elementor, нет единого шаблона B2 (FAQ, Product schema, блок «от X ₽/м²»).
4. **Главная и «О компании»** — в JSON ещё старый WP-контент (несколько H1, «водянистый» текст).
5. **Проекты** — 10 кейсов без отдельных SEO-брифов; слабая передача E-E-A-T на коммерческие URL.
6. **GSC отключён** — нет данных для приоритизации; еженедельный ритуал из SEO-плана заблокирован.

---

## 2. Часть A — Консолидация блога (выполнено)

Таблица 301: [`docs/blog-redirects.md`](../docs/blog-redirects.md).

| Старый slug (серия `vosstanovlenie…`) | Новый канон | Статус |
|---------------------------------------|-------------|--------|
| `…interera/` | `/blog/planken-dlya-hvoynoy-drevesiny/` | ✅ |
| `…interera-2/` | `/blog/pokraska-terrasnoy-doski-listvennitsa-velvet/` | ✅ |
| `…interera-3/` | `/blog/pokraska-fasada-plankenom-hvoya/` | ✅ |
| `…interera-4/` | `/blog/pokraska-plankena-listvennitsy-fasad/` | ✅ |
| `…interera-5/` | `/blog/pokraska-imitacii-brusa-hvoya-interer/` | ✅ |
| `…interera-6/` | `/blog/kak-vybrat-postavshchika-krashenoy-doski/` | ✅ |
| `…interera-7/` | `/blog/imitaciya-brusa-hvoya-vnutrennyaya-otdelka/` | ✅ |
| `…interera-8/` | `/blog/terrasnaya-doska-zavodskaya-pokraska/` | ✅ |
| `…interera-9/` | `/blog/oficialnyy-diler-sirca/` | ✅ |
| `…interera-10/` | `/blog/kachestvo-proverennoe-vremenem/` | ✅ |
| `…derevjanny/` | `/blog/pokraska-imitacii-brusa-hvoi-interer/` | ✅ |
| `…derevjanny-3/` | `/blog/hvoya-preimushchestva-dlya-fasada/` | ✅ |
| `…derevjanny-4/` | `/blog/kontrol-kachestva-na-proizvodstve/` | ✅ |
| `…derevjannyh-fasadov/` | `/blog/pokraska-derevyannyh-fasadov-nash-podhod/` | ✅ |

Без редиректа (каноны с первого дня): `brend`, `dostavka-v-regiony`, `chto-vygodnee-krasit-samomu-ili-na-proizvodstve`.

---

## 3. Часть B — Опубликованные статьи по фазам

### Фаза 1 — коммерческое ядро (6 статей)

| Slug | Кластер | Дата |
|------|---------|------|
| `krashenaya-vagonka-kak-vybrat` | вагонка | 2026-08-14 |
| `ukryvnaya-vs-lessiruyushchaya-vs-maslo` | покрытия | 2026-08-14 |
| `planken-listvennitsa-pryamoy-i-skoshennyy` | планкен | 2026-08-15 |
| `shemy-pokraski-sirca-kakoy-tarif` | Sirca / цена | 2026-08-15 |
| `skandinavskaya-doska-chto-eto-uys-uys` | скандинавская | 2026-08-16 |
| `kak-zakazat-vykras-i-podobrat-cvet` | заказ / палитра | 2026-08-16 |

### Фаза 2 — фасад и материалы (6 статей)

| Slug | Кластер |
|------|---------|
| `imitaciya-brusa-interer-vs-fasad` | имитация бруса |
| `terrasnaya-doska-maslo-talatu-vs-kraska` | терраса |
| `pokraska-fasada-doma-poshagovo` | фасад |
| `sosna-eli-listvennitsa-dlya-fasada` | породы |
| `oshibki-pokraski-dereva-na-obekte` | ошибки |
| `srok-sluzhby-zavodskogo-pokrytiya` | долговечность |

### Фаза 3 — аудитории и сезон (4 статьи)

| Slug | Кластер |
|------|---------|
| `brashirovanie-i-pokraska-doski` | браширование |
| `pokraska-zimoy-v-tsehu-vs-na-obekte` | сезон |
| `krashenaya-doska-karkasnyy-dom` | каркасник |
| `krashenaya-doska-dlya-stroiteley-i-dizaynerov` | B2B |

### Фаза 4 — услуги и кейсы (6 статей)

| Slug | Кластер |
|------|---------|
| `restavratsiya-vs-pokraska-s-nulya` | реставрация |
| `montazh-krashenoy-doski` | монтаж |
| `palitra-kd-kak-chitat-kody` | палитра KD |
| `ekologichnost-lkm-dlya-doma` | экология |
| `kejs-fasad-planken-listvennitsy` | кейс |
| `kejs-pokrashka-podshivki-kleenyy-brus` | кейс |

### Фаза 5 — региональная серия (18 статей)

Хаб: `/blog/dostavka-v-regiony/`. Города: Москва, СПб, Калуга, Тверь, Владимир, Н. Новгород, Казань, Краснодар, Ярославль, Рязань, Ростов, Сочи, Воронеж, Самара, Тула, Смоленск, Уфа, Пермь.

Скрипт: `site/scripts/create-regional-delivery-articles.mjs`.

### Legacy (17 статей, без брифа)

Требуют **обновления через пайплайн** (приоритет — пересечение с коммерческими кластерами):

| Slug | Действие |
|------|----------|
| `pokraska-plankena-listvennitsy-fasad` | Объединить ссылочный вес с `planken-listvennitsa-pryamoy-i-skoshennyy` или переписать |
| `pokraska-fasada-plankenom-hvoya` | Переписать / canonical на фасадный кластер |
| `pokraska-imitacii-brusa-hvoya-interer` | Переписать |
| `imitaciya-brusa-hvoya-vnutrennyaya-otdelka` | Переписать |
| `pokraska-derevyannyh-fasadov-nash-podhod` | Переписать (УТП) |
| `hvoya-preimushchestva-dlya-fasada` | Переписать |
| `planken-dlya-hvoynoy-drevesiny` | Переписать |
| `terrasnaya-doska-zavodskaya-pokraska` | Сверить с `terrasnaya-doska-maslo-talatu-vs-kraska` |
| `pokraska-terrasnoy-doski-listvennitsa-velvet` | Сверить с террасным кластером |
| `oficialnyy-diler-sirca` | Обновить (патент + дилерство) |
| `kachestvo-proverennoe-vremenem` | Обновить E-E-A-T |
| `kontrol-kachestva-na-proizvodstve` | Обновить |
| `kak-vybrat-postavshchika-krashenoy-doski` | Обновить |
| `pokraska-imitacii-brusa-hvoi-interer` | Проверить дубль с `-hvoya-interer` |
| `brend` | Обновить (патент 2025) |
| `dostavka-v-regiony` | Дополнить ссылками на 18 городов |
| `chto-vygodnee-krasit-samomu-ili-na-proizvodstve` | Сверить с `/zavodskaya-pokraska/` |

---

## 4. Часть C — Коммерческие страницы (шаблон B2)

Каждый P0-лендинг должен содержать: H1 + цена «от…», первый экран УТП, таблица профилей, FAQ (5–7), CTA, ссылки на 2–3 статьи и 1 проект.

### P0 — срочно (коммерческие клики в GSC)

| URL | Было | Стало / нужно |
|-----|------|----------------|
| `/katalog/planken/` | WP HTML, цена в description | ✅ SEO title, FAQ + Product schema, перелинковка |
| `/katalog/krashenaja-vagonka/` | Слабый сниппет | ✅ SEO title, FAQ + Product schema, перелинковка |
| `/katalog/krashenaja-imitacija-brusa/` | Поз. ~30–50 | ✅ SEO title, FAQ + Product schema, перелинковка |
| `/` | 3+ H1 в legacy content | Один H1, блок цен, ссылки на `/proizvodstvo-istra/` |

**Title (цель):**

```
Крашеный планкен от 2 050 ₽/м² — заводская покраска, Истра | Крашеная доска
Крашеная вагонка штиль от 1 850 ₽/м² — в наличии, Москва | Крашеная доска
Имитация бруса крашеная от … ₽/м² — Sirca, 5–7 дней | Крашеная доска
```

**Description (цель, 140–160 симв.):**

```
Планкен прямой и скошенный из лиственницы и хвои. Заводская покраска Sirca в Истре, гарантия 3 года. От 2 050 ₽/м². Доставка по России. Выкрас бесплатно.
```

### P1 — услуги и вторичные лендинги

| URL | Задача |
|-----|--------|
| `/nanesenie-masla-i-voska/` | FAQ: Talatu vs Sirca, сроки, цены |
| `/restavracija-derevyannyh-poverhnostej/` | FAQ + ссылка на `restavratsiya-vs-pokraska-s-nulya` |
| `/katalog/fasadnaja-doska/` | Цены, сроки, 2 кейса |
| `/katalog/skandinavskaja-doska/` | УТП «уys/uys», ссылка на статью |
| `/katalog/terrasnaja-doska/` | Масло Talatu, ссылка на сравнение |
| `/katalog/krashenaja-doska/` | Паркет/палуба — CTR (поз. ~10) |
| `/o-kompanii/` | Сократить, убрать дубли H3, факты цеха |
| `/uslugi/` | CTR при поз. ~4 — усилить description |

### P2 — готово / поддержка

| URL | Статус |
|-----|--------|
| `/proizvodstvo-istra/` | ✅ `commercial-landings.ts` |
| `/zavodskaya-pokraska/` | ✅ |
| `/tehnologija-nanesenija-kraski/` | FAQ UI есть — проверить schema |
| `/shema-pokraski/` | Актуализировать цены из `catalog-prices.json` |
| `/palitra/` + подстраницы | Alt, внутренние ссылки на KD-статью |

---

## 5. Фаза 6 — очередь нового контента

Ритм после пакетного августа: **1 статья / неделю** + **1 коммерческий лендинг / 2 недели**. Перед брифом — `python3 scripts/gsc_export.py` (после настройки GSC).

### 5.1 Приоритет P0 (брифы создать)

| # | Тема / slug | Зачем | Связка | Статус |
|---|-------------|-------|--------|--------|
| 1 | `krashenaya-imitaciya-brusa-kupit` | GSC: коммерция, 0 кликов | → `/katalog/krashenaja-imitacija-brusa/` | ✅ 2026-09-16 |
| 2 | `krashenyy-planken-kupit-moskva` | 146 показов на планкен | → `/katalog/planken/` | ✅ 2026-09-16 |
| 3 | `krashenaya-fasadnaya-doska` | Фасадный кластер | → `/katalog/fasadnaja-doska/` | ✅ 2026-09-16 |
| 4 | `blok-haus-krashenyy` | Категория без статей | → каталог блок-хаус | ✅ 2026-09-16 |
| 5 | Обновление `brend` | E-E-A-T, патент | → `/o-kompanii/` | ✅ 2026-09-16 |

Изображения: `/uploads/blog/2026/09/{slug}.webp` (уникальные, сгенерированы под тему статьи).

### 5.2 Приоритет P1

| # | Тема | Зачем |
|---|------|-------|
| 6 | Кейс: нормальный slug вместо `preobrazim-derevo…` | 10 проектов — SEO-мусор в URL | ✅ `pokrashka-podshivki-kleenyy-brus` (1/9) |
| 7 | `palubnaya-doska-zavodskaya-pokraska` | Категория без контента | ✅ 2026-09-16 |
| 8 | `krashenaya-doska-dlya-bani` | Long-tail, сезон |
| 9 | `antiseptik-i-grunt-zavodskaya-pokraska` | Технология / доверие |
| 10 | `dostavka-krashenoy-doski-v-ekaterinburg` | Только если GSC покажет спрос на регионы |

### 5.3 Региональная серия — политика расширения

- **Не добавлять** новые города без данных GSC/Wordstat.
- **Через 60 дней:** статьи с 0 показов 90 дней — `noindex` или 301 на `/blog/dostavka-v-regiony/`.
- **Усилить хаб** `dostavka-v-regiony`: таблица городов, сроки, карта направлений.

### 5.4 Проекты → контент

| Проект | Предлагаемая статья/доработка |
|--------|------------------------------|
| `fasad-iz-plankena-listvennicy` | Уже есть `kejs-fasad-planken-listvennitsy` — перелинковка |
| Остальные 9 | Бриф «кейс» на каждый с уникальным slug |

---

## 6. Пайплайн публикации

```
Wordstat / GSC → briefs/{slug}.md → create article → drafts/ → editor-in-chief → site/content/blog/{slug}.json
```

| Параметр | Значение |
|----------|----------|
| Объём статьи | 1 800–2 500 слов |
| Голос | `GUIDELINE.md`, EEAT от Андрея Сергеевича где в брифе |
| Внутренние ссылки | Минимум 3: каталог + услуга/технология + 1 статья |
| `publishedAt` | Планировать ≥ 24 ч до сборки |
| Редиректы | Новый slug при замене legacy → запись в `docs/blog-redirects.md` + `_redirects` |

### Еженедельный ритуал

1. `python3 scripts/gsc_cli.py status && python3 scripts/gsc_export.py`
2. Сверить топ-20 запросов с таблицей §1.3
3. Закрыть **один** пункт из §4 (коммерция) или §5.1 (статья)
4. Проверить 5 URL в GSC Inspect

---

## 7. KPI контент-плана (90 дней от 2026-09-16)

| KPI | База (GSC, июль 2026) | Цель |
|-----|----------------------|------|
| Клики / 28 дн. | 15 | ≥ 80 |
| Небрендовые клики | ≈ 0–2 | ≥ 30 |
| Статьи с ≥ 1 кликом | н/д | ≥ 15 из 57 |
| P0-лендинги по шаблону B2 | 3 из 3 | 3 из 3 (поддержка) |
| Legacy-статьи обновлены | 1 из 17 (`brend`) | ≥ 8 из 17 |
| Проекты с SEO-описанием | 0 | 10 |

---

## 8. Сводка: что делать дальше

```
Сейчас          →  Ближайшие 4 недели     →  90 дней
─────────────────────────────────────────────────────────
57 статей       →  3 P0-лендинга B2       →  GSC-цикл
17 legacy       →  4 новых брифа §5.1     →  8 legacy обновлено
2 спец.лендинга →  Настроить GSC          →  Кейсы проектов
18 гео-статей   →  Мониторинг дублей      →  Решение по noindex
```

**Стоп-факторы:** не запускать рекламу на слабые лендинги (§4 P0); не добавлять города без аналитики; не публиковать > 2 статей/нед без новых GSC-данных.
