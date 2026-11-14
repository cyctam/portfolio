import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className = "" }: RevealProps) {
  const [ref, seen] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
