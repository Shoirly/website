import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Layout";
import { site } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="sh-dark border-t border-sh-border">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo tone="dark" height={28} />
            <p className="mt-4 max-w-[34ch] text-sm text-sh-muted">
              Signed evidence of what your AI agent did, and who approved it.
            </p>
            <a className="link mt-4 inline-flex min-h-11 items-center text-sm" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {site.footer.map((col) => (
              <div key={col.heading}>
                <h2 className="text-sm font-semibold text-sh-text">{col.heading}</h2>
                <ul className="mt-2 lg:mt-3 lg:space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-11 items-center text-sm text-sh-muted transition-colors duration-150 hover:text-sh-text lg:min-h-0"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-sh-border pt-6 text-xs text-sh-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. Made in Dublin.
          </p>
          {site.social.linkedin ? (
            <a className="hover:text-sh-text" href={site.social.linkedin} rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
