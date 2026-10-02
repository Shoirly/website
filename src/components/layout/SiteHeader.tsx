"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SolutionsMenu({ pathname }: { pathname: string }) {
  const item = site.nav.find((n) => "children" in n);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  // True while the menu is open because the pointer is over it, so a click
  // during the hover doesn't immediately close what the hover just opened.
  const hoverOpened = useRef(false);
  const menuId = useId();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!item || !("children" in item)) return null;
  const active = item.children.some((c) => isActive(pathname, c.href));

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        hoverOpened.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        hoverOpened.current = false;
        setOpen(false);
      }}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          if (hoverOpened.current) {
            hoverOpened.current = false;
            setOpen(true);
            return;
          }
          setOpen((v) => !v);
        }}
        className={`inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm transition-colors duration-150 hover:text-ink ${
          active ? "text-ink" : "text-graphite"
        }`}
      >
        {item.label}
        <CaretDown
          size={12}
          weight="bold"
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease }}
            className="absolute left-1/2 top-full w-[372px] -translate-x-1/2 pt-2"
          >
            <ul className="rounded-md border border-rule bg-paper p-1.5 shadow-paper">
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[5px] px-3 py-2.5 transition-colors duration-150 hover:bg-ledger"
                  >
                    <span className="block text-sm font-medium text-ink">{child.label}</span>
                    <span className="mt-0.5 block text-xs text-graphite">{child.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const links: { label: string; href: string }[] = site.nav.flatMap((n): { label: string; href: string }[] =>
    "children" in n ? n.children.map((c) => ({ label: c.label, href: c.href })) : [{ label: n.label, href: n.href }],
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.15 } }}
          transition={{ duration: 0.2, ease }}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper lg:hidden"
        >
          <nav aria-label="Mobile" className="px-4 pb-10 pt-4 min-[400px]:px-6">
            <ul className="divide-y divide-rule border-b border-rule">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, ease, delay: reduce ? 0 : 0.03 * i }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    aria-current={isActive(pathname, l.href) ? "page" : undefined}
                    className="flex min-h-14 items-center text-xl font-medium text-ink aria-[current=page]:text-seal-deep"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-graphite">
              Questions?{" "}
              <a className="link inline-flex min-h-11 items-center" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const pillSpring = { type: "spring" as const, stiffness: 520, damping: 42 };

/** Sliding hover pill and active underline shared by the desktop nav items. */
function NavMarks({ hovered, active }: { hovered: boolean; active: boolean }) {
  return (
    <>
      {hovered ? (
        <motion.span
          layoutId="nav-hover"
          aria-hidden
          className="absolute inset-0 rounded-md bg-ink-soft"
          transition={pillSpring}
        />
      ) : null}
      {active ? (
        <motion.span
          layoutId="nav-active"
          aria-hidden
          className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-seal"
          transition={pillSpring}
        />
      ) : null}
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  // Border, blur and a soft shadow appear once the page scrolls under the header.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 8;
    if (next !== scrolled) setScrolled(next);
  });
  const [lastPath, setLastPath] = useState(pathname);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close the mobile menu on route change (adjusting state during render, per React docs).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-ink px-4 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-2"
      >
        Skip to content
      </a>
      <MotionConfig reducedMotion="user">
      <header
        className={`sticky top-0 z-50 border-b transition-[border-color,background-color,box-shadow] duration-300 ease-out ${
          scrolled || menuOpen
            ? "border-rule bg-paper/90 shadow-[0_8px_24px_-18px_rgb(15_27_23/0.35)] backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-paper"
            : "border-transparent bg-paper"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-4 min-[400px]:px-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
              {site.nav.map((item) =>
                "children" in item ? (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setHovered(item.label)}
                    onFocus={() => setHovered(item.label)}
                    onBlur={() => setHovered(null)}
                  >
                    <NavMarks
                      hovered={hovered === item.label}
                      active={item.children.some((c) => isActive(pathname, c.href))}
                    />
                    <div className="relative">
                      <SolutionsMenu pathname={pathname} />
                    </div>
                  </li>
                ) : (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    onBlur={() => setHovered(null)}
                  >
                    <NavMarks hovered={hovered === item.href} active={isActive(pathname, item.href)} />
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="relative inline-flex h-10 items-center rounded-md px-3 text-sm text-graphite transition-colors duration-150 hover:text-ink aria-[current=page]:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="/demo" size="md" className="max-[359px]:px-3">
              Book a demo
            </ButtonLink>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-ink-soft lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} aria-hidden /> : <List size={22} aria-hidden />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
      </MotionConfig>
    </>
  );
}
