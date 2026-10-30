"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

type NavItem = { label: string; href: string };

export function Header({
  name,
  initials,
  photo,
  navigation,
}: {
  name: string;
  initials: string;
  photo?: string;
  navigation: NavItem[];
}) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

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
          {photo ? (
            <span className="brand-portrait" aria-hidden="true">
              <Image
                className="brand-photo"
                src={photo}
                alt=""
                width={42}
                height={42}
                sizes="42px"
              />
            </span>
          ) : (
            <span className="brand-mark" aria-hidden="true">
              {initials}
              <span>.</span>
            </span>
          )}
          <span className="brand-name">{name}</span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.label === "Contact" ? "nav-contact" : ""}
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
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
            <Icon name="arrow" size={16} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
