"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { PalettePageData, PaletteSwatch } from "@/lib/palette-data";

type PaletteSwatchCatalogProps = {
  data: PalettePageData;
};

function groupSwatches(swatches: PaletteSwatch[]) {
  const groups = new Map<string, PaletteSwatch[]>();
  for (const swatch of swatches) {
    const group = swatch.group ?? "Палитра";
    const list = groups.get(group) ?? [];
    list.push(swatch);
    groups.set(group, list);
  }
  return [...groups.entries()];
}

function isLightHex(hex: string): boolean {
  const value = hex.replace("#", "");
  if (value.length !== 6) return false;
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

export function PaletteSwatchCatalog({ data }: PaletteSwatchCatalogProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase().replace(/\s+/g, "");
    if (!q) return data.swatches;
    return data.swatches.filter((swatch) => {
      const haystack = `${swatch.code} ${swatch.name}`.toLowerCase().replace(/\s+/g, "");
      return haystack.includes(q);
    });
  }, [data.swatches, deferredQuery]);

  const groups = useMemo(() => groupSwatches(filtered), [filtered]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="block min-w-[220px] flex-1">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
            Поиск по коду или названию
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Например: 7016 или антрацит"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent"
          />
        </label>
        <p className="text-sm text-white/55">
          Найдено: <span className="font-semibold text-white">{filtered.length}</span>
        </p>
      </div>

      {groups.length === 0 ? (
        <p className="text-sm text-white/60">Нет оттенков по запросу. Измените поиск или сбросьте фильтр.</p>
      ) : (
        groups.map(([group, swatches]) => (
          <section key={group}>
            <h2 className="text-lg font-semibold text-white">{group}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {swatches.map((swatch) => {
                const light = isLightHex(swatch.hex);
                return (
                  <article
                    key={swatch.code}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                  >
                    <div
                      className="relative aspect-[5/4] w-full"
                      style={{ backgroundColor: swatch.hex }}
                      aria-hidden="true"
                    >
                      <span
                        className={[
                          "absolute bottom-2 left-2 rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide",
                          light ? "bg-black/45 text-white" : "bg-white/20 text-white",
                        ].join(" ")}
                      >
                        {swatch.code}
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-white">{swatch.code}</p>
                      <p className="mt-0.5 text-xs leading-snug text-white/65">{swatch.name}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
