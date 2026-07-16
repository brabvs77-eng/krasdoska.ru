"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/technology";

type FaqAccordionProps = {
  items: FaqItem[];
  title?: string;
  variant?: "light" | "dark" | "accent";
  align?: "left" | "center";
};

export function FaqAccordion({
  items,
  title = "Частые вопросы",
  variant = "light",
  align = "left",
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = variant === "dark";
  const isAccent = variant === "accent";

  if (isAccent) {
    return (
      <section>
        <h2 className={`section-title text-white ${align === "center" ? "text-center" : ""}`}>
          {title}
        </h2>
        <ul className="mt-6">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.question} className="mb-3 overflow-hidden rounded-lg">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 bg-accent px-5 py-4 text-left font-semibold text-white transition-colors hover:bg-accent-dark"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="mt-1 shrink-0 text-white">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <p className="bg-white/5 px-5 py-4 text-sm leading-relaxed text-white/80">
                    {item.answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  return (
    <section className={isDark ? undefined : "mt-12"}>
      <h2
        className={`section-title ${isDark ? "text-white" : ""} ${align === "center" ? "text-center" : ""}`}
      >
        {title}
      </h2>
      <ul
        className={`mt-6 divide-y rounded-2xl border ${
          isDark
            ? "divide-white/10 border-white/10 bg-white/5"
            : "divide-neutral-200 border-neutral-200 bg-white"
        }`}
      >
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <li key={item.question}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className={`font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                  {item.question}
                </span>
                <span className="mt-1 shrink-0 text-accent">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p
                  className={`px-5 pb-4 text-sm leading-relaxed ${
                    isDark ? "text-white/80" : "text-neutral-600"
                  }`}
                >
                  {item.answer}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
