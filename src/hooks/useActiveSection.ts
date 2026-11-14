import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the reading line,
 * used to mark the matching nav link with aria-current.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [current, setCurrent] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );

    for (const id of key.split("|")) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [key]);

  return current;
}
