import Link from "next/link";
import type { ComponentProps } from "react";

type ArrowLinkProps = ComponentProps<typeof Link> & {
  children: React.ReactNode;
};

export function ArrowLink({ children, className = "", ...props }: ArrowLinkProps) {
  return (
    <Link
      className={`inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark ${className}`}
      {...props}
    >
      {children}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
        <path
          d="M5.08316 4.55307H11.4471V10.917M11.0052 4.99502L4.55283 11.4474"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </svg>
    </Link>
  );
}
