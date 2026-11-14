import { useEffect, useRef, useState } from "react";

/**
 * Open/closed state for the collapsible menu.
 * Closes on Escape (and returns focus to the toggle), on a click outside the
 * header, and when the viewport grows to the desktop layout.
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest(".site-header")) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  useEffect(() => {
    // Same breakpoint as the CSS: 46rem.
    const desktop = window.matchMedia("(min-width: 46rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  return { open, setOpen, toggleRef };
}
