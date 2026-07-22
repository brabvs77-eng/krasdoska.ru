"use client";

import { useDeferredValue, useMemo, useState, type ReactNode } from "react";
import { OsmoSwatchGrid } from "@/components/sections/OsmoSwatchGrid";
import {
  DEFAULT_OSMO_FILTERS,
  filterOsmoSections,
  type OsmoCatalogFilters,
  type OsmoFinish,
  type OsmoScope,
  type OsmoSection,
} from "@/lib/osmo-palette";

type OsmoPaletteCatalogProps = {
  sections: OsmoSection[];
};

const SCOPE_OPTIONS: { value: OsmoCatalogFilters["scope"]; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "interior", label: "Интерьер" },
  { value: "exterior", label: "Фасад" },
];

const FINISH_OPTIONS: { value: OsmoCatalogFilters["finish"]; label: string }[] = [
  { value: "all", label: "Любая" },
  { value: "шлифовка", label: "Шлифовка" },
  { value: "брашировка", label: "Брашировка" },
];

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-lg px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-accent text-white"
          : "border border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function OsmoPaletteCatalog({ sections }: OsmoPaletteCatalogProps) {
  const [filters, setFilters] = useState<OsmoCatalogFilters>(DEFAULT_OSMO_FILTERS);
  const deferredQuery = useDeferredValue(filters.query);

  const activeFilters = useMemo(
    () => ({ ...filters, query: deferredQuery }),
    [filters, deferredQuery],
  );

  const visibleSections = useMemo(
    () => filterOsmoSections(sections, activeFilters),
    [sections, activeFilters],
  );

  const visibleCount = useMemo(
    () => visibleSections.reduce((sum, section) => sum + section.items.length, 0),
    [visibleSections],
  );

  const setScope = (scope: "all" | OsmoScope) => setFilters((prev) => ({ ...prev, scope }));
  const setFinish = (finish: "all" | OsmoFinish) => setFilters((prev) => ({ ...prev, finish }));

  const resetFilters = () => setFilters(DEFAULT_OSMO_FILTERS);

  const hasActiveFilters =
    filters.scope !== "all" ||
    filters.finish !== "all" ||
    filters.query.trim() !== "" ||
    filters.exclusiveOnly ||
    filters.layerCompare;

  return (
    <>
      <section
        id="catalog-filters"
        className="scroll-mt-24 border-t border-white/10 bg-brand-dark py-10 sm:py-12"
      >
        <div className="container-content">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">Каталог оттенков</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
                Фильтр по назначению, фактуре и коду Osmo. Режим сравнения показывает образцы с
                одним и двумя слоями на одной доске.
              </p>
            </div>
            <p className="text-sm text-white/55">
              Найдено: <span className="font-semibold text-white">{visibleCount}</span>
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                Назначение
              </p>
              <div className="flex flex-wrap gap-2">
                {SCOPE_OPTIONS.map((option) => (
                  <FilterChip
                    key={option.value}
                    active={filters.scope === option.value}
                    onClick={() => setScope(option.value)}
                  >
                    {option.label}
                  </FilterChip>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                Фактура
              </p>
              <div className="flex flex-wrap gap-2">
                {FINISH_OPTIONS.map((option) => (
                  <FilterChip
                    key={option.value}
                    active={filters.finish === option.value}
                    onClick={() => setFinish(option.value)}
                  >
                    {option.label}
                  </FilterChip>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                  Поиск по коду
                </span>
                <input
                  type="search"
                  value={filters.query}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, query: event.target.value }))
                  }
                  placeholder="Например: 3092 или S8000"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent"
                />
              </label>

              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-lg border border-white/20 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Сбросить
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={filters.exclusiveOnly}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, exclusiveOnly: !prev.exclusiveOnly }))
                }
              >
                Только эксклюзив
              </FilterChip>
              <FilterChip
                active={filters.layerCompare}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, layerCompare: !prev.layerCompare }))
                }
              >
                Сравнение 1 и 2 слоёв
              </FilterChip>
            </div>

            {filters.layerCompare ? (
              <p className="max-w-3xl text-sm leading-relaxed text-accent/90">
                На образцах с подписью «1–2 слоя» слева обычно один слой покрытия, справа — два.
                Так удобнее оценить насыщенность тона до заказа партии.
              </p>
            ) : null}
          </div>

          <nav className="mt-10" aria-label="Разделы каталога Osmo">
            <h3 className="text-lg font-semibold text-white">Разделы</h3>
            {visibleSections.length > 0 ? (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {visibleSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:border-accent/50 hover:text-white"
                    >
                      {section.title}
                      <span className="ml-2 text-white/45">({section.items.length})</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-white/60">
                Нет оттенков по выбранным фильтрам. Сбросьте условия или измените поиск.
              </p>
            )}
          </nav>
        </div>
      </section>

      {visibleSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-24 border-t border-white/10 bg-brand-dark py-12 sm:py-16"
        >
          <div className="container-content">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="max-w-4xl text-xl font-semibold text-white sm:text-2xl">
                {section.title}
              </h2>
              {section.exclusive ? (
                <span className="rounded-md border border-accent/40 bg-accent/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                  Эксклюзив
                </span>
              ) : null}
            </div>
            {section.lead && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75">{section.lead}</p>
            )}
            {section.note && (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">{section.note}</p>
            )}

            <OsmoSwatchGrid
              items={section.items}
              sectionId={section.id}
              compareMode={filters.layerCompare}
            />
          </div>
        </section>
      ))}
    </>
  );
}
