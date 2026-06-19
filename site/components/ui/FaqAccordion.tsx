"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/technology";

type FaqAccordionProps = {
  items: FaqItem[];
  title?: string;
};

export function FaqAccordion({ items, title = "Частые вопросы" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
      <ul className="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
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
                <span className="font-semibold text-neutral-900">{item.question}</span>
                <span className="mt-1 shrink-0 text-accent">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-neutral-600">{item.answer}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
