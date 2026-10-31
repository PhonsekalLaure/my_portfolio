"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let resetObserver: IntersectionObserver | undefined;

    function prepare() {
      if (!container) return;
      observer?.disconnect();
      resetObserver?.disconnect();
      const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");

      if (reducedMotion.matches) {
        elements.forEach((element) => {
          delete element.dataset.revealState;
        });
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              !entry.isIntersecting ||
              (entry.target as HTMLElement).dataset.revealState !== "pending"
            )
              return;
            (entry.target as HTMLElement).dataset.revealState = "revealed";
          });
        },
        { threshold: 0.08 },
      );

      // Reset beyond the viewport, keeping partially visible content steady.
      resetObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            if (
              !entry.isIntersecting &&
              !element.contains(document.activeElement)
            ) {
              element.dataset.revealState = "pending";
            }
          });
        },
        { rootMargin: "64px 0px", threshold: 0 },
      );

      // Read geometry before changing styles to avoid repeated layout flushes.
      const initialStates = Array.from(elements, (element) => ({
        element,
        visible: element.getBoundingClientRect().top < window.innerHeight - 32,
      }));
      initialStates.forEach(({ element, visible }) => {
        element.dataset.revealState = visible ? "settled" : "pending";
        observer?.observe(element);
        resetObserver?.observe(element);
      });
    }

    function onFocus(event: FocusEvent) {
      // Keyboard focus reveals immediately. Pointer focus must not move a link
      // between pointer-down and pointer-up while its entrance is running.
      if (
        !(event.target instanceof Element) ||
        !event.target.matches(":focus-visible")
      )
        return;
      const element = event.target.closest<HTMLElement>("[data-reveal]");
      if (!element || !container?.contains(element)) return;
      element.dataset.revealState = "settled";
    }

    prepare();
    // Live updates can replace keyed cards while this wrapper stays mounted.
    const contentObserver = new MutationObserver((records) => {
      const changed = records.some((record) =>
        [...record.addedNodes, ...record.removedNodes].some(
          (node) =>
            node instanceof Element &&
            (node.matches("[data-reveal]") ||
              node.querySelector("[data-reveal]")),
        ),
      );
      if (changed) prepare();
    });
    contentObserver.observe(container, { childList: true, subtree: true });
    reducedMotion.addEventListener("change", prepare);
    container.addEventListener("focusin", onFocus);

    return () => {
      observer?.disconnect();
      resetObserver?.disconnect();
      contentObserver.disconnect();
      reducedMotion.removeEventListener("change", prepare);
      container.removeEventListener("focusin", onFocus);
      container
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => {
          delete element.dataset.revealState;
        });
    };
  }, []);

  return (
    <div ref={root} className="scroll-reveal">
      {children}
    </div>
  );
}
