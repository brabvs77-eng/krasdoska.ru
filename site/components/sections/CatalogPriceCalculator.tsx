"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  formatRub,
  uniqueSorted,
  type CatalogPricesData,
  type PriceGradeId,
} from "@/lib/catalog-prices";

type Props = {
  data: CatalogPricesData;
};

const fieldClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent";

const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50";

function dimLabel(thickness: number, width: string, length: string): string {
  return `${thickness} × ${width} × ${length} мм`;
}

export function CatalogPriceCalculator({ data }: Props) {
  const [collectionId, setCollectionId] = useState(data.collections[0]?.id ?? "");
  const [profile, setProfile] = useState("");
  const [wood, setWood] = useState("");
  const [dimKey, setDimKey] = useState("");
  const [grade, setGrade] = useState<PriceGradeId>("av");
  const [area, setArea] = useState("50");

  const collection = useMemo(
    () => data.collections.find((item) => item.id === collectionId) ?? data.collections[0],
    [collectionId, data.collections],
  );

  const profiles = useMemo(
    () => uniqueSorted((collection?.items ?? []).map((item) => item.profile)),
    [collection],
  );

  const activeProfile = profile && profiles.includes(profile) ? profile : profiles[0] ?? "";

  const woods = useMemo(
    () =>
      uniqueSorted(
        (collection?.items ?? [])
          .filter((item) => item.profile === activeProfile)
          .map((item) => item.wood)
          .filter((value): value is string => Boolean(value)),
      ),
    [collection, activeProfile],
  );

  const activeWood = wood && woods.includes(wood) ? wood : woods[0] ?? "";

  const dimensions = useMemo(() => {
    const rows = (collection?.items ?? []).filter(
      (item) => item.profile === activeProfile && item.wood === activeWood,
    );
    return rows.map((item) => ({
      key: `${item.thickness}|${item.width}|${item.length}`,
      label: dimLabel(item.thickness, item.width, item.length),
      item,
    }));
  }, [collection, activeProfile, activeWood]);

  const activeDim =
    dimensions.find((row) => row.key === dimKey) ?? dimensions[0] ?? null;

  const availableGrades = useMemo(() => {
    if (!activeDim) return [];
    return data.grades.filter((g) => activeDim.item.prices[g.id] != null);
  }, [activeDim, data.grades]);

  const activeGrade =
    availableGrades.find((g) => g.id === grade)?.id ?? availableGrades[0]?.id ?? null;

  const pricePerM2 =
    activeDim && activeGrade ? activeDim.item.prices[activeGrade] ?? null : null;

  const areaValue = Number(String(area).replace(",", "."));
  const areaOk = Number.isFinite(areaValue) && areaValue > 0;
  const total = pricePerM2 != null && areaOk ? Math.round(pricePerM2 * areaValue) : null;

  return (
    <section id="kalkulyator" className="section-dark scroll-mt-24 py-16 sm:py-20">
      <div className="container-content">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Калькулятор
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Рассчитайте стоимость крашеной доски
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            Актуальный прайс по профилю, породе, сечению и сорту. Укажите площадь — получите
            ориентир в рублях за готовое изделие.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div>
              <label className={labelClass} htmlFor="calc-collection">
                Назначение
              </label>
              <select
                id="calc-collection"
                className={fieldClass}
                value={collection?.id ?? ""}
                onChange={(event) => {
                  setCollectionId(event.target.value);
                  setProfile("");
                  setWood("");
                  setDimKey("");
                }}
              >
                {data.collections.map((item) => (
                  <option key={item.id} value={item.id} className="bg-brand-dark text-white">
                    {item.title}
                  </option>
                ))}
              </select>
              {collection?.subtitle ? (
                <p className="mt-2 text-xs text-white/45">{collection.subtitle}</p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="calc-profile">
                Профиль
              </label>
              <select
                id="calc-profile"
                className={fieldClass}
                value={activeProfile}
                onChange={(event) => {
                  setProfile(event.target.value);
                  setWood("");
                  setDimKey("");
                }}
              >
                {profiles.map((value) => (
                  <option key={value} value={value} className="bg-brand-dark text-white">
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="calc-wood">
                  Порода
                </label>
                <select
                  id="calc-wood"
                  className={fieldClass}
                  value={activeWood}
                  onChange={(event) => {
                    setWood(event.target.value);
                    setDimKey("");
                  }}
                >
                  {woods.map((value) => (
                    <option key={value} value={value} className="bg-brand-dark text-white">
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="calc-dim">
                  Сечение (Т × Ш × Д)
                </label>
                <select
                  id="calc-dim"
                  className={fieldClass}
                  value={activeDim?.key ?? ""}
                  onChange={(event) => setDimKey(event.target.value)}
                >
                  {dimensions.map((row) => (
                    <option key={row.key} value={row.key} className="bg-brand-dark text-white">
                      {row.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <span className={labelClass}>Сорт</span>
                <div className="flex flex-wrap gap-2">
                  {availableGrades.map((item) => {
                    const selected = item.id === activeGrade;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGrade(item.id)}
                        className={
                          selected
                            ? "rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white"
                            : "rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
                        }
                      >
                        {item.label}
                      </button>
                    );
                  })}
                  {availableGrades.length === 0 ? (
                    <p className="text-sm text-white/55">Для этой позиции сорт не указан в прайсе.</p>
                  ) : null}
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="calc-area">
                  Площадь, м²
                </label>
                <input
                  id="calc-area"
                  type="number"
                  min={1}
                  step={1}
                  inputMode="decimal"
                  className={fieldClass}
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                />
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-accent/30 bg-accent/10 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Итого
            </p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-white/65">Цена за 1 м²</dt>
                <dd className="text-lg font-semibold text-white">
                  {pricePerM2 != null ? formatRub(pricePerM2) : "—"}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-white/65">Площадь</dt>
                <dd className="font-medium text-white">
                  {areaOk ? `${areaValue} м²` : "—"}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-1">
                <dt className="text-white/65">Ориентир стоимости</dt>
                <dd className="text-2xl font-semibold text-accent">
                  {total != null ? formatRub(total) : "—"}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-xs leading-relaxed text-white/55">{data.note}</p>

            <Link href="/#form" className="btn-primary mt-6 inline-flex w-full sm:w-auto">
              Заказать точный расчёт
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
