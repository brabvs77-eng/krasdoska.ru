import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  PRODUCTION_PHASES,
  PRODUCTION_STEPS,
  TECHNOLOGY_CLOSING,
  type ProductionStep,
} from "@/lib/technology";

function KindIcon({ kind }: { kind: ProductionStep["kind"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  const icons: Record<ProductionStep["kind"], ReactNode> = {
    prep: (
      <svg {...common}>
        <path d="M4 20h16" />
        <path d="M7 20V10l5-6 5 6v10" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
    coat: (
      <svg {...common}>
        <path d="M12 3v6" />
        <path d="M8 9h8l-1.2 9.2A2 2 0 0 1 12.8 20h-1.6a2 2 0 0 1-2-1.8L8 9Z" />
        <path d="M9.5 13h5" />
      </svg>
    ),
    dry: (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
    sand: (
      <svg {...common}>
        <path d="M4 16c3-1 5-4 8-4s5 3 8 4" />
        <path d="M4 12c3-1 5-4 8-4s5 3 8 4" />
        <path d="M4 8c3-1 5-4 8-4s5 3 8 4" />
      </svg>
    ),
    pack: (
      <svg {...common}>
        <path d="M3.5 8.5 12 4l8.5 4.5v9L12 22l-8.5-4.5v-9Z" />
        <path d="M3.5 8.5 12 13l8.5-4.5M12 13v9" />
      </svg>
    ),
  };

  return icons[kind];
}

export function TechnologyProcessInfographic() {
  let stepIndex = 0;

  return (
    <section className="tech-process mt-12" aria-labelledby="tech-process-title">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Производственный цикл
        </p>
        <h2 id="tech-process-title" className="section-title mt-3">
          Технология производства
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
          {PRODUCTION_STEPS.length} контролируемых этапов — от калибровки на КШС до упаковки
          лицевых пластей. Каждый переход закрепляет качество покрытия до отгрузки.
        </p>
      </header>

      <ol className="tech-process__phases mt-10" role="list">
        {PRODUCTION_PHASES.map((phase) => {
          const steps = PRODUCTION_STEPS.filter((step) => step.phase === phase.id);
          return (
            <li key={phase.id} className="tech-process__phase">
              <div className="tech-process__phase-label">
                <span className="tech-process__phase-name">{phase.label}</span>
                <span className="tech-process__phase-summary">{phase.summary}</span>
              </div>

              <ol className="tech-process__steps" role="list">
                {steps.map((step) => {
                  stepIndex += 1;
                  const n = String(stepIndex).padStart(2, "0");
                  return (
                    <li
                      key={`${phase.id}-${step.title}-${n}`}
                      className="tech-process__step"
                      style={{ "--step-i": stepIndex } as CSSProperties}
                    >
                      <div className="tech-process__node" aria-hidden>
                        <span className="tech-process__index">{n}</span>
                        <span className="tech-process__icon">
                          <KindIcon kind={step.kind} />
                        </span>
                      </div>
                      <div className="tech-process__body">
                        <p className="tech-process__title">{step.title}</p>
                        {step.note ? (
                          <p className="tech-process__note">{step.note}</p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>

      <div className="tech-process__finish">
        <div className="tech-process__finish-mark" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7 10.5 17.5 4 11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {TECHNOLOGY_CLOSING.ready}
          </p>
          <p className="mt-2 text-sm italic text-white/60 sm:text-base">{TECHNOLOGY_CLOSING.ps}</p>
          <p className="mt-5 text-sm text-white/75">
            {TECHNOLOGY_CLOSING.schemesLead}{" "}
            <Link href="/shema-pokraski/" className="text-accent underline-offset-2 hover:underline">
              схемы покраски
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
