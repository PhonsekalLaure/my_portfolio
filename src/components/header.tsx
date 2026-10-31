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
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const currentSection = pathname === "/" ? activeSection : null;
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

    function updateSection() {
      frame = 0;
      const bar = header.current?.querySelector(".header-inner");
      const anchorOffset =
        Number.parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      // Anchor destinations must count as current even with a shorter header.
      const marker = Math.max(
        (bar?.getBoundingClientRect().bottom ?? 88) + 32,
        anchorOffset + 1,
      );
      const positions = sections.map((section) => ({
        id: section.id,
        top: section.getBoundingClientRect().top,
      }));
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      let next: string | null = null;
      for (const section of positions) {
        if (section.top > marker) break;
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

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const contentResize = new ResizeObserver(scheduleUpdate);
    contentResize.observe(document.body);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      contentResize.disconnect();
    };
  }, [navigation, pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (open && !header.current?.contains(event.target as Node))
        setOpen(false);
    }
    function onResize() {
      if (window.innerWidth > 900) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
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
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-name">{name}</span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.label === "Contact" ? "nav-contact" : ""}
              aria-current={
                currentSection === item.href.split("#")[1]
                  ? "location"
                  : undefined
              }
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
            aria-current={
              currentSection === item.href.split("#")[1]
                ? "location"
                : undefined
            }
          >
            {item.label}
            <Icon name="arrow" size={16} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
