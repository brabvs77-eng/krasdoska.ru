"use client";

export function ScrollToTop() {
  return (
    <button
      type="button"
      aria-label="Наверх"
      className="fixed bottom-24 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-brand text-white shadow-lg transition hover:bg-brand-dark sm:bottom-8"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="17" height="10" viewBox="0 0 17 10" fill="none" aria-hidden>
        <path
          d="M8.81795 3.6359L15.1821 10L17 8.18205L8.81795 0L0.635896 8.18205L2.45384 10L8.81795 3.6359Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
