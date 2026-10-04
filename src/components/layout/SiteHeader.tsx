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
        className={`inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm transition-colors duration-150 hover:text-sh-text ${
          active ? "text-sh-text" : "text-sh-muted"
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
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
            transition={{ duration: 0.18, ease }}
            className="absolute left-1/2 top-full w-[372px] -translate-x-1/2 pt-2"
          >
            <ul className="rounded-md border border-sh-border bg-sh-bg p-1.5 shadow-pop">
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[5px] px-3 py-2.5 transition-colors duration-150 hover:bg-sh-bg-subtle"
                  >
                    <span className="block text-sm font-medium text-sh-text">{child.label}</span>
                    <span className="mt-0.5 block text-xs text-sh-muted">{child.description}</span>
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
          className="sh-dark fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-sh-bg lg:hidden"
        >
          <nav aria-label="Mobile" className="px-[var(--sh-gutter)] pb-10 pt-4">
            <ul className="divide-y divide-sh-border border-b border-sh-border">
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  initial={false}
                  animate={{ opacity: 1 }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    aria-current={isActive(pathname, l.href) ? "page" : undefined}
                    className="flex min-h-14 items-center text-xl font-medium text-sh-text aria-[current=page]:text-sh-accent-text"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <ButtonLink href="/demo" size="lg" className="mt-8 w-full sm:hidden" onClick={onClose}>
              Book a demo
            </ButtonLink>
            <p className="mt-8 text-sm text-sh-muted">
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

/** Current-page marker: a static accent underline (BRAND.md: hover/focus change colour only). */
function NavMarks({ active }: { hovered?: boolean; active: boolean }) {
  return active ? (
    <span aria-hidden className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-sh-accent" />
  ) : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  // The bottom border appears once the page scrolls under the header (BRAND.md 8).
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
        className="sr-only z-[60] rounded-md bg-sh-text px-4 py-3 text-sm text-sh-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-2"
      >
        Skip to content
      </a>
      <MotionConfig reducedMotion="user">
      <header
        // Anchored during page transitions (see ::view-transition-*(site-header) in globals.css).
        style={{ viewTransitionName: "site-header" }}
        className={`sticky top-0 z-50 border-b transition-[border-color] duration-[var(--sh-dur-fast)] ${
          scrolled || menuOpen
            ? "border-sh-border bg-sh-bg"
            : "border-transparent bg-sh-bg"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-4 min-[400px]:px-6">
          <Link href="/" aria-label="Shoirly home" className="inline-flex min-h-11 items-center">
            <Logo height={26} title="" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {site.nav.map((item) =>
                "children" in item ? (
                  <li
                    key={item.label}
                    className="relative"
                  >
                    <NavMarks active={item.children.some((c) => isActive(pathname, c.href))}
                    />
                    <div className="relative">
                      <SolutionsMenu pathname={pathname} />
                    </div>
                  </li>
                ) : (
                  <li
                    key={item.href}
                    className="relative"
                  >
                    <NavMarks active={isActive(pathname, item.href)} />
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="relative inline-flex h-10 items-center rounded-md px-3 text-sm text-sh-muted transition-colors duration-150 hover:text-sh-text aria-[current=page]:text-sh-text"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="/demo" size="md" className="max-sm:hidden">
              Book a demo
            </ButtonLink>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-sh-text hover:bg-sh-ink-soft lg:hidden"
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
