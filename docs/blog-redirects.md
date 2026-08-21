# Таблица редиректов блога

Старые slug из WordPress (тема «восстановление полов») не соответствуют содержанию. Новые URL — семантические, с 301 в `site/public/_redirects`.

| Старый URL | Новый URL | Тема статьи |
|------------|-----------|-------------|
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera/` | `/blog/planken-dlya-hvoynoy-drevesiny/` | Планкен для хвойной древесины |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-2/` | `/blog/pokraska-terrasnoy-doski-listvennitsa-velvet/` | Террасная доска лиственница, масло |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-3/` | `/blog/pokraska-fasada-plankenom-hvoya/` | Фасад из планкена, хвоя |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-4/` | `/blog/pokraska-plankena-listvennitsy-fasad/` | Планкен лиственницы для фасада |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-5/` | `/blog/pokraska-imitacii-brusa-hvoya-interer/` | Имитация бруса, интерьер |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-6/` | `/blog/kak-vybrat-postavshchika-krashenoy-doski/` | Выбор поставщика |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-7/` | `/blog/imitaciya-brusa-hvoya-vnutrennyaya-otdelka/` | Имитация бруса из хвои |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-8/` | `/blog/terrasnaya-doska-zavodskaya-pokraska/` | Террасная доска |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-9/` | `/blog/oficialnyy-diler-sirca/` | Официальный дилер Sirca |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-10/` | `/blog/kachestvo-proverennoe-vremenem/` | Качество производства |
| `/blog/vosstanovlenie-i-pokraska-derevjanny/` | `/blog/pokraska-imitacii-brusa-hvoi-interer/` | Покраска имитации бруса |
| `/blog/vosstanovlenie-i-pokraska-derevjanny-3/` | `/blog/hvoya-preimushchestva-dlya-fasada/` | Хвоя: преимущества |
| `/blog/vosstanovlenie-i-pokraska-derevjanny-4/` | `/blog/kontrol-kachestva-na-proizvodstve/` | Контроль качества |
| `/blog/vosstanovlenie-i-pokraska-derevjannyh-fasadov/` | `/blog/pokraska-derevyannyh-fasadov-nash-podhod/` | Покраска деревянных фасадов |

## Без изменений

| URL | Примечание |
|-----|------------|
| `/blog/brend/` | Патент бренда |
| `/blog/dostavka-v-regiony/` | Доставка |
| `/blog/chto-vygodnee-krasit-samomu-ili-na-proizvodstve/` | Сравнение способов покраски |

## Новые статьи (фаза 1)

| URL | Дата публикации | Статус |
|-----|---------------|--------|
| `/blog/krashenaya-vagonka-kak-vybrat/` | 2026-08-22 09:00 | по расписанию |
| `/blog/ukryvnaya-vs-lessiruyushchaya-vs-maslo/` | 2026-08-22 15:00 | по расписанию |
| `/blog/planken-listvennitsa-pryamoy-i-skoshennyy/` | 2026-08-23 09:00 | по расписанию |
| `/blog/shemy-pokraski-sirca-kakoy-tarif/` | 2026-08-23 15:00 | по расписанию |
| `/blog/skandinavskaya-doska-chto-eto-uys-uys/` | 2026-08-24 09:00 | по расписанию |
| `/blog/kak-zakazat-vykras-i-podobrat-cvet/` | 2026-08-24 15:00 | по расписанию |

Расписание: поле `publishedAt` в JSON, фильтр в `getAllBlogPosts()` / `getBlogSlugs()`. Статья появляется после следующей сборки сайта, когда `publishedAt <= now`.
