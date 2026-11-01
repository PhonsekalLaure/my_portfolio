"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

type NavItem = { label: string; href: string };

export function Header({
  name,
  navigation,
}: {
  name: string;
  navigation: NavItem[];
}) {
  const [firstName, ...lastName] = name.split(" ");
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const activeHref =
    pathname === "/" && activeSection ? `/#${activeSection}` : undefined;
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = navigation
      .map((item) => document.getElementById(item.href.split("#")[1]))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    let frame = 0;
    let previous: string | null | undefined;
    let marker = 0;
    const bar = header.current?.querySelector(".header-inner");

    function updateMarker() {
      const anchorOffset =
        Number.parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      // Anchor destinations must count as current even with a shorter header.
      marker = Math.max(
        (bar?.getBoundingClientRect().bottom ?? 88) + 32,
        anchorOffset + 1,
      );
      scheduleUpdate();
    }

    function updateSection() {
      frame = 0;
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      let next: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > marker) break;
        next = section.id;
      }
      if (atBottom) next = sections[sections.length - 1].id;

      if (previous !== next) {
        previous = next;
        setActiveSection(next);
      }
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    }

    updateMarker();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", updateMarker);
    const contentResize = new ResizeObserver(scheduleUpdate);
    contentResize.observe(document.body);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", updateMarker);
      contentResize.disconnect();
    };
  }, [navigation, pathname]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    function onDesktop(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 901px)");
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    const dark = current
      ? current === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }

  return (
    <header className="site-header" ref={header}>
      <div className="container header-inner">
        <Link
          href="/#top"
          className="brand"
          onClick={() => setOpen(false)}
          onNavigate={() => {
            // Repeated navigation to the same URL may preserve its scroll position.
            if (pathname === "/") window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          <span className="brand-name">
            {firstName}{" "}
            <span className="brand-surname">{lastName.join(" ")}</span>
            <span className="brand-period" aria-hidden="true">
              .
            </span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.label === "Contact" ? "nav-contact" : ""}
              aria-current={activeHref === item.href ? "location" : undefined}
            >
              {item.label}
              {item.label === "Contact" && <Icon name="external" size={14} />}
            </Link>
          ))}
        </nav>
        <div className="header-controls">
          <button
            className="icon-button theme-toggle"
            type="button"
            aria-label="Toggle light and dark theme"
            onClick={toggleTheme}
          >
            <Icon name="sun" className="sun-icon" />
            <Icon name="moon" className="moon-icon" />
          </button>
          <button
            ref={menuButton}
            type="button"
            className="icon-button menu-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav container"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={activeHref === item.href ? "location" : undefined}
          >
            {item.label}
            <Icon name="arrow" size={16} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
