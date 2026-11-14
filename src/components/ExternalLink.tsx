import type { ReactNode } from "react";

export const NEW_TAB = " (opens in a new tab)";

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only">{NEW_TAB}</span>
    </a>
  );
}
