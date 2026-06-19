# Инвентаризация krashenayadoska.ru

**Источники:**
- `krashenayadoskaru.WordPress.2026-06-18.xml` — WXR-экспорт (только контент, 18.06.2026)
- `krashenayadoska-ru-20260618-232914-rprpynbqkzvl.wpress` — полный бэкап All-in-One WP Migration (18.06.2026, ~2,63 ГБ)
**Дизайн (база):** [Figma — Крашеная доска](https://www.figma.com/design/L9OGKob1Hx7ZQIPkCedwTq/%D0%9A%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B0%D1%8F-%D0%B4%D0%BE%D1%81%D0%BA%D0%B0)  
**Домен:** https://krashenayadoska.ru  
**Компания:** ООО «Крашеная доска» — производитель крашеной доски, Москва / Истра

---

## 1. Технический стек (текущий WP)

| Компонент | Назначение |
|-----------|------------|
| **WordPress 7.0** | CMS |
| **Elementor** | Вёрстка страниц, header/footer, шаблоны |
| **ACF** | Кастомные поля и регистрация CPT/таксономий |
| **Кастомные типы записей** | `project`, `blog-post` |
| **Стандартные записи `post`** | Карточки каталога (привязка к категориям) |
| **Категории `category`** | Разделы каталога продукции |
| **Marquiz** | Квиз/лид-форма (ID: `6a1226b74922200019dd589d`) |
| **Тема** | `hello-elementor` + дочерняя `hello-elementor-child` |
| **Кэш** | WP Super Cache |
| **Аналитика** | Google Site Kit, Яндекс.Метрика, PixelYourSite |
| **SEO** | Yoast (`wordpress-seo`) |

**Нет WooCommerce** — каталог реализован через посты + категории + Elementor Loop.

### Плагины (из полного бэкапа, 18 шт.)

| Плагин | Назначение |
|--------|------------|
| `advanced-custom-fields` | Кастомные поля, CPT |
| `elementor` + `elementor-pro` | Вёрстка, шаблоны, Loop |
| `unlimited-elements-for-elementor` | Доп. виджеты Elementor |
| `document-embedder-addons-for-elementor` | Встраивание PDF/документов |
| `navz-photo-gallery` | Галереи |
| `safe-svg` | SVG в медиатеке |
| `wordpress-seo` | SEO (Yoast) |
| `wp-super-cache` | Кэширование страниц |
| `google-site-kit` | Google Analytics / Search Console |
| `wp-yandex-metrika` | Яндекс.Метрика |
| `pixelyoursite` | Facebook Pixel |
| `cookie-notice` | Баннер cookies |
| `cyrlitera` | Транслитерация slug (кириллица → латиница) |
| `duplicate-page` | Дублирование страниц |
| `post-types-order` | Порядок записей в админке |
| `http2-push-content` | HTTP/2 server push |
| `filester` | Файловый менеджер в админке |

### Сервер (из `package.json` бэкапа)

| Параметр | Значение |
|----------|----------|
| Хостинг-путь | `/var/www/u3070106/data/www/krashenayadoska.ru/` |
| PHP | 8.2.29 (Linux) |
| MySQL | 8.0.43, charset `utf8mb4`, префикс таблиц `wptv_` |
| БД (имя) | `u3070106_wp846` |
| AI1WM | v7.105 |

**WXR vs полный бэкап:** XML содержит только записи и метаданные. Файл `.wpress` — полный снимок: `database.sql` (~414 МБ), все плагины, темы, `uploads`, `.htaccess`.

---

## 1.1 Полный бэкап `.wpress` (проверено)

| Показатель | Значение |
|------------|----------|
| Файл | `krashenayadoska-ru-20260618-232914-rprpynbqkzvl.wpress` |
| Размер | **2 633 МБ** (2 761 506 478 байт) |
| Формат | All-in-One WP Migration (ServMask), блочный заголовок 4377 байт |
| Записей в архиве | **16 465** файлов |
| `database.sql` | **414 МБ**, 28 таблиц |
| Медиа `uploads/` | **1 643** файла, **~289 МБ** |
| Файлы плагинов | 14 337 |
| Файлы тем | 227 (`hello-elementor`, `hello-elementor-child`, стандартные) |

**Дочерняя тема:** `hello-elementor-child` — кастомный JS (`assets/js/main.js`).

**Медиа по расширениям (uploads):**

| Расширение | Кол-во |
|------------|--------|
| `.jpg` | 701 |
| `.webp` | 539 |
| `.png` | 245 |
| `.woff2` | 84 |
| `.svg` | 36 |
| `.mp4` | 1 (~77 МБ, видео «Технология») |

**Важно:** в `uploads` лежат **старые вложенные бэкапы** (`wp_krashenayadoska.ru_2025-*.tar.gz`, суммарно ~1,5+ ГБ). Они раздувают архив, но не нужны для нового сайта — при миграции их можно не переносить.

**Артефакты разбора** (в `docs/`):
- `wpress-package.json` — метаданные сайта и список плагинов
- `wpress-manifest.csv` — полный список файлов архива
- `wpress-summary.txt` — сводная статистика

**Вывод:** бэкап **полный и пригоден** для восстановления WP или извлечения БД/медиа/настроек Elementor. Для нового стека достаточно распаковать `database.sql` + `uploads` + экспорт ACF/Elementor JSON.

---

| Тип | Кол-во (опублик.) | Примечание |
|-----|-------------------|------------|
| Страницы `page` | 13 | + 3 черновика |
| Проекты `project` | 10 | Портфолио |
| Новости `blog-post` | 16 | Блог |
| Записи каталога `post` | ~19 | Товары/позиции |
| Медиафайлы `attachment` | 357 | URL в XML, файлы — на сервере |
| Шаблоны Elementor | 23 | Header, footer, loop, секции |
| Группы полей ACF | 3 | Проект, Статья, Gallery |

---

## 3. Карта сайта (актуальное меню)

Порядок пунктов меню `Menu`:

| # | URL (slug) | Название |
|---|------------|----------|
| — | `/` | Главная (`glavnaja`, ID 10) |
| 1 | `/uslugi/` | Услуги |
| 2 | `/o-kompanii/` | О компании |
| 3 | `/blog/` | Новости / блог |
| 4 | `/kontakty/` | Контакты |
| 5 | `/katalog/` | Каталог |
| 6 | `/palitra/` | Палитра |

**Вне основного меню (но опубликованы):**
- `/tehnologija-nanesenija-kraski/` — Технология нанесения краски
- `/politika-konfidencialnosti/` — Политика конфиденциальности

---

## 4. Структура страниц

### 4.1 Главная `/`
**Секции (из контента):**
- Hero-слайдер (покраска фасадов, УТП)
- Блок преимуществ (качество, долговечность, контроль, шлифовка, автоматизация, экология)
- Каталог продукции (сетка категорий)
- Наши услуги (3 направления)
- Эксклюзивные цвета (KD-25, KD-32, KD-28, KD-6, KD-15)
- Новости и статьи (превью)
- Выполненные работы (слайдер проектов)
- Партнёры и бренды
- Форма «Остались вопросы?» / заказ звонка
- SEO-текст о компании

### 4.2 Каталог `/katalog/`
- Обзор категорий продукции
- Шаблон архива категорий: Elementor `arhiv-kategorij-tovarov`
- Карточка товара: Elementor `single-zapisi`

**Категории продукции (WP `category`):**

| Slug | Название | Родитель |
|------|----------|----------|
| `krashenaja-doska` | Крашеная доска | — |
| `vagonka` | Вагонка | — |
| `krashenaja-vagonka` | Крашеная вагонка | vagonka |
| `imitacija-brusa` | Имитация бруса | — |
| `krashenaja-imitacija-brusa` | Крашеная имитация бруса | — |
| `planken` | Планкен | — |
| `skandinavskaja-doska` | Скандинавская доска | — |
| `terrasnaja-doska` | Террасная доска | — |

**Доп. URL с главной (вероятно отдельные лендинги категорий/постов):**
`krashenaja-vagonka`, `krashenyj-planken`, `doska-pola`, `parketnaja-doska`, `fasadnaja-doska`, `massiv-pola`, `palubnaja-doska`, `blok-haus` и др.

### 4.3 Услуги `/uslugi/`
**Дочерние страницы:**
- `/uslugi/pokraska-dereva-na-stanke-metodom-raspyleni/` — Покраска на станке (опубликована)

**Упоминаются на сайте, отдельные страницы в экспорте не найдены:**
- Нанесение масла, воска на пиломатериалы
- Реставрация

### 4.4 Палитра `/palitra/` *(дополнение после Figma, май 2026)*
- `/palitra/palitra-ral/` — Палитра RAL
- `/palitra/palitra-ncs/` — Палитра NCS
- `/palitra/palitra-cvetov-biofa/` — Палитра BIOFA

### 4.5 Технология `/tehnologija-nanesenija-kraski/` *(дополнение, март 2026)*
- Видео производства
- Пошаговый процесс (11 этапов)
- FAQ-аккордеон (доставка, гарантия 3 года, срок 14 дней, Sirca и т.д.)

### 4.6 О компании `/o-kompanii/`
- История, миссия, услуги (покраска, реставрация, грунтование)
- Партнёры

### 4.7 Блог `/blog/`
Архив CPT `blog-post`. Теги `news-tag`: краски, материалы, новинки, новости, покраска, покрытие, полезное, статьи, технологии, шлифовка, доставка.

**Примеры статей:**
- Доставка в регионы
- Бренд
- Серия статей о восстановлении и покраске деревянных фасадов/полов

### 4.8 Проекты `/project/...`
CPT `project`, 10 опубликованных работ.

**Таксономии:**
- `project-categoties`: покраска, покрытие, шлифовка, готовый проект
- `project-parrent` (услуга): покраска на станке, нанесение масла/воска, реставрация

**Пример:** «Фасад из планкена лиственницы»

**ACF-поля проекта:** hero, описание, слайдер, галерея, логотипы партнёров

### 4.9 Контакты `/kontakty/`
- Адрес, телефоны, реквизиты (ИНН 9715482912 / КПП 771501001)
- Форма обратной связи

### 4.10 Служебные
- `/politika-konfidencialnosti/`

---

## 5. Компоненты Elementor (переиспользуемые)

| Slug | Тип | Назначение |
|------|-----|------------|
| `elementor-header-13` | header | Шапка |
| `footer` | footer | Подвал |
| `nabor-po-umolchaniju` | kit | Набор по умолчанию |
| `custom-projects` | page | Блок проектов |
| `loop-project-card` | loop-item | Карточка проекта |
| `elementor-loop-item` | loop-item | Карточка записи |
| `our-servicies` | section | Услуги |
| `partners-form` | section | Форма партнёров |
| `colors` | section | Цвета |
| `breadcrump` | section | Хлебные крошки |
| `projects-cards-slider` | section | Слайдер проектов |
| `news-cards` | section | Карточки новостей |
| `about-us` | section | О нас |
| `order` | section | Заказ |
| `seo` / `end` | section | SEO-блок, подвал секции |
| `elementor-single-post-*` | single | Шаблоны single |
| `single-zapisi` | single | Single записи каталога |
| `arhiv-kategorij-tovarov` | archive | Архив категорий |

---

## 6. ACF — модель данных

### Группа «Проект» (`project`)
- Hero секция, описание, hero-images, hero-logos, slider, основное описание

### Группа «Статья» (`blog-post`)
- Вводная часть, excerpt карточки, вводная картинка, контент, слайдер, текст + видео

### Группа «Gallery»
- Галерея изображений

---

## 7. Предлагаемая структура нового сайта

Рекомендуемый стек для редизайна: **Next.js / Astro + headless CMS** или **чистый WP с кастомной темой** (без Elementor) — на выбор на этапе ТЗ.

```
/
├── catalog/                          # Каталог
│   ├── [category]/                   # Категория (вагонка, планкен…)
│   └── [category]/[product]/         # Карточка позиции
├── services/                         # Услуги
│   ├── painting-spray/               # Покраска на станке
│   ├── oil-wax/                      # Масло и воск
│   └── restoration/                  # Реставрация
├── palette/                          # Палитра
│   ├── ral/
│   ├── ncs/
│   └── biofa/
├── technology/                       # Технология производства
├── projects/                         # Портфолио
│   └── [slug]/
├── blog/                             # Новости
│   └── [slug]/
├── about/
├── contacts/
└── privacy/
```

### Общие UI-компоненты (из Figma + дополнения WP)

| Компонент | Где используется |
|-----------|------------------|
| Header + мобильное меню | Везде |
| Footer + реквизиты | Везде |
| Hero (слайдер / статика) | Главная, категории |
| ProductCard | Главная, каталог |
| ServiceCard | Главная, услуги |
| ProjectCard + слайдер | Главная, проекты |
| NewsCard | Главная, блог |
| ColorSwatch (KD-*) | Главная, палитра |
| PartnerLogo grid | Главная, о компании |
| ContactForm / CallbackForm | Главная, контакты |
| FAQ accordion | Технология, услуги |
| Breadcrumbs | Внутренние страницы |
| Video block | Технология |
| CTA «Заказать звонок» | Глобально |

### Типы контента (CMS schema)

```yaml
ProductCategory:
  title, slug, description, image, parent, seo

Product:
  title, slug, category, gallery, specs, price_note, colors, seo

Service:
  title, slug, hero, content_blocks, related_projects

Project:
  title, slug, categories, service_type, hero, gallery, description, partners

Article:
  title, slug, tags, excerpt, hero_image, content_blocks, video_url

PaletteEntry:
  system: RAL | NCS | BIOFA
  code, name, hex, image

Partner:
  name, logo, url

SiteSettings:
  phones, email, address, inn_kpp, social, marquiz_id
```

---

## 8. Расхождения Figma ↔ продакшен (дополнения не в макете)

| Элемент | Дата в WP | Комментарий |
|---------|-----------|-------------|
| Раздел «Палитра» + 3 подстраницы | Май 2026 | Новый пункт меню |
| «Технология нанесения краски» | Март 2026 | Видео, FAQ, этапы |
| Расширенный FAQ на страницах | 2026 | Гарантия, доставка, Sirca |
| Marquiz-квиз | 2026 | Лидогенерация |
| Дубль страницы `katalog-2` | Май 2026 | Проверить редирект |
| Больше категорий каталога на главной | — | Часть URL не в экспорте категорий |

**Действие:** при синхронизации с Figma — добавить фреймы для Палитры, Технологии и актуального каталога.

---

## 9. Медиа и ассеты

**WXR:** 357 вложений (только метаданные и URL).

**Полный бэкап:** 1 643 физических файла в `uploads/` (~289 МБ без вложенных `.tar.gz`).
- Базовый путь: `https://krashenayadoska.ru/wp-content/uploads/`
- Основные форматы: JPEG, WebP, PNG; шрифты (woff2) — вероятно Elementor/Google Fonts
- Логотип, favicon: `cropped-photo_2025-05-18...`
- Видео: `video_2026-03-13_23-56-23.mp4` (~77 МБ) — страница «Технология»
- Шрифт в шаблонах: **Manrope**

Для нового сайта: медиа уже есть в `.wpress` — достаточно извлечь `uploads/` (без старых `.tar.gz` внутри).

---

## 10. Следующие шаги

1. **Уточнить целевой стек** — статический фронт, WP headless, или обновлённый WP.
2. **Сверить Figma** — пройти все экраны, отметить отличия от п.8.
3. **Извлечь медиа из `.wpress`** — `uploads/` (исключить вложенные `.tar.gz` бэкапов 2025 г.).
4. **Согласовать URL-структуру** — сохранить текущие slug для SEO или настроить 301.
5. **Миграция контента** — парсинг WXR + `database.sql` → JSON/MDX для нового CMS; Elementor data из `wptv_postmeta`.
6. **Интеграции** — формы, Marquiz, аналитика (Site Kit / Метрика / Pixel), карты.

---

*Документ обновлён по WXR и полному бэкапу `.wpress` (18.06.2026). Figma MCP был недоступен — визуальная сверка макета требует ручного прохода.*
