"use client";

import { Check, Copy, EnvelopeSimple } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

/*
 * Booking actions on /demo while booking is by email. A mailto link does
 * nothing on devices with no email app set up (common on Windows and in
 * browsers without a mail handler), so webmail and copy alternatives sit
 * right under the main button, and a hint appears after it's clicked.
 */
const { subject, body } = site.demoRequest;
const enc = encodeURIComponent;

const webmail = [
  {
    label: "Gmail",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(site.email)}&su=${enc(subject)}&body=${enc(body)}`,
  },
  {
    label: "Outlook",
    href: `https://outlook.office.com/mail/deeplink/compose?to=${enc(site.email)}&subject=${enc(subject)}&body=${enc(body)}`,
  },
];

const secondary =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-sh-border-strong/60 bg-sh-bg px-3 text-sm text-sh-text transition-colors duration-150 hover:border-sh-text/60 hover:bg-sh-ink-soft";

export function BookingActions() {
  const [clicked, setClicked] = useState(false);
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (copy === "idle") return;
    const id = window.setTimeout(() => setCopy("idle"), 2400);
    return () => window.clearTimeout(id);
  }, [copy]);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  }

  if (!site.bookingIsMailto) {
    return (
      <ButtonLink href={site.bookingUrl} size="lg" className="mt-7 w-full">
        Book a demo
      </ButtonLink>
    );
  }

  return (
    <div className="mt-7">
      <ButtonLink href={site.bookingUrl} size="lg" className="w-full" onClick={() => setClicked(true)}>
        <EnvelopeSimple size={18} aria-hidden />
        Book a demo
      </ButtonLink>
      <p className="mt-3 text-center text-sm text-sh-muted" aria-live="polite">
        {clicked
          ? "Nothing opened? Use one of the options below instead."
          : "Opens your email app with a short message ready to send."}
      </p>

      <div className="mt-5 border-t border-sh-border pt-5">
        <p className="text-sm text-sh-muted">Or write from your browser</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {webmail.map((w) => (
            <a key={w.label} href={w.href} target="_blank" rel="noopener noreferrer" className={secondary}>
              {w.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
        <button type="button" onClick={copyAddress} className={`${secondary} mt-2 w-full`}>
          {copy === "copied" ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          {copy === "copied" ? "Copied" : copy === "failed" ? site.email : `Copy ${site.email}`}
        </button>
        <span className="sr-only" aria-live="polite">
          {copy === "copied" ? "Email address copied" : copy === "failed" ? `Copy failed. The address is ${site.email}` : ""}
        </span>
      </div>
    </div>
  );
}
