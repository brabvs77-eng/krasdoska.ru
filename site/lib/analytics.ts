/** Reach Yandex Metrika goals from client components. */

declare global {
  interface Window {
    ym?: (id: number | string, method: string, ...args: unknown[]) => void;
  }
}

export type MetrikaGoal =
  | "lead_form"
  | "phone_click"
  | "marquiz_open";

export function trackMetrikaGoal(goal: MetrikaGoal, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const id = window.__YM_COUNTER_ID__;
  if (!id || typeof window.ym !== "function") return;
  try {
    window.ym(id, "reachGoal", goal, params);
  } catch {
    // ignore analytics errors
  }
}

declare global {
  interface Window {
    __YM_COUNTER_ID__?: string;
  }
}
