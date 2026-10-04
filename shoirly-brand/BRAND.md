# Shoirly brand system

> **For Claude Code:** this file is the single source of truth for how shoirly.com looks, reads and behaves. When redesigning or adding any page, follow it over anything already in the codebase. Tokens live in `tokens.css` (and `tokens.json`), logo files in `logo/` and `icons/`, and the React logo in `Logo.tsx`. Never hard-code a hex value, font name or spacing value that exists as a token. If something isn't covered here, choose the option that is quieter, flatter and more precise, and note the decision in `DECISIONS.md`.

---

## 0. How to apply this to the site

1. Copy `tokens.css` into the global stylesheet (or map every `--sh-*` variable into the Tailwind theme / CSS system the repo already uses). Keep the variable names.
2. Load fonts as in section 4 (with `next/font` if this is Next.js).
3. Replace every existing logo instance with `Logo.tsx`. Replace favicons, app icons and the OG image with the files in `icons/`.
4. Remove the old seal-as-O logo, the Bricolage Grotesque font and the old palette entirely, including leftovers in CSS, metadata and `/public`.
5. Rebuild pages using the patterns in sections 7 to 10. Keep all real copy and claims; do not add new ones (section 11).
6. Check every page against the checklist in section 13 before finishing.

---

## 1. The brand in one minute

**What Shoirly does:** independent, cryptographically signed proof of every action an AI agent took and who approved it. AI agent companies use it to get through security reviews and procurement with regulated buyers, starting with banks and insurers.

**Pitch line:** Certs show your AI agent passed tests. Shoirly shows what it actually did.

**Audience:** founders, CTOs and security leads at AI agent companies, plus the bank and insurer security reviewers who read their trust pages. Technical, sceptical, short on time.

**Personality:** precise, calm, evidential. It should feel like a well-kept ledger, not a hype deck. Confident because it shows its working, never because it shouts.

**The idea behind the mark:** an open evidence frame (the bracket) with a tick that breaks out of it. The record is the container; the approval is what leaves the box and goes to the buyer. Everything visual in the system comes from those two shapes: hard square frames and a single decisive diagonal.

**Design principles**
- **Evidence over decoration.** Every line, border and graphic should look like it belongs on a record, a blueprint or an audit log. If it's only there to look nice, cut it.
- **Flat and exact.** Solid colour, crisp edges, 1px hairlines, almost no shadow, no gradients.
- **One bold move per screen.** Usually an oversized cropped mark, or one framed focal element. Everything around it stays quiet.
- **White first, ink for weight.** Most pages are white with ink text. Ink sections are used for contrast and emphasis, never as the default for every block.
- **Blue means action or proof.** Use blue for the mark, primary buttons, links, verified states and the key graphic. Not for big decorative fills everywhere.

---

## 2. Logo

### Files

| File | Use |
|---|---|
| `logo/shoirly-logo.svg` | Primary. Blue mark, ink wordmark. Light backgrounds. |
| `logo/shoirly-logo-on-dark.svg` | Blue mark, white wordmark. Ink backgrounds. |
| `logo/shoirly-logo-white.svg` | All white. On blue backgrounds or imagery. |
| `logo/shoirly-logo-ink.svg` | All ink. One-colour use only. |
| `logo/shoirly-mark*.svg` | Symbol only (blue, white, ink). |
| `logo/shoirly-wordmark*.svg` | Wordmark only. Rare; prefer the full lockup. |
| `icons/app-icon*.svg`, `icons/*.png` | App icon, favicons, touch icon, PWA icons. |
| `icons/favicon.svg` | Vector favicon, switches to a lighter blue in dark mode. |
| `icons/og-image.png` | 1200×630 social share image. |
| `Logo.tsx` | React component with `variant` (`full`/`mark`) and `tone` (`light`/`dark`/`white`/`ink`). |

All files are outlined vectors, no font dependency.

### Construction
- **Mark:** an open square frame (top bar, left bar, short bottom bar with a 45° cut) plus a tick whose long arm leaves the frame on the right. Frame and tick share one stroke weight (16 units on a 116 × 102 grid). The gap between the frame's cut and the tick equals roughly half a stroke. Do not redraw it; use the files.
- **Wordmark:** `shoirly` in Space Mono Regular, always lowercase, outlined, tracking −20/1000.
- **Lockup:** mark height ≈ 1.08 × the wordmark's ascender height, mark bottom sitting just below the baseline. Gap between mark and wordmark = 0.3 × mark height. Fixed: never re-space.

### Clear space and sizes
- Clear space on all sides = **half the mark's height (X)**. Nothing (text, edges, other logos) inside it.
- Minimum lockup width: **96px** on screen, 25mm in print. Below that, use the mark alone.
- Minimum mark size: **16px** (favicon). At 16 to 24px use the mark with no wordmark.
- Navbar: full lockup at **24 to 28px height** desktop, 22 to 24px mobile.

### Colour rules
- Light backgrounds (white, gray-25): primary logo.
- Ink backgrounds: on-dark logo (blue mark, white wordmark).
- Blue backgrounds: all-white logo. Never put the blue mark on blue.
- Busy imagery: all-white or all-ink, whichever passes contrast.

### Don't
Stretch, rotate, outline, add shadows or glows, recolour the mark to anything but blue/white/ink, separate the tick from the frame, close the frame, change the wordmark font or case, write "Shoirly" with a capital in the logo, put the logo in a container shape (except the app icon), animate the wordmark letters.

### Name in text
In running copy the company is **Shoirly** (capital S, sentence case like any proper noun). Only the logo is lowercase. Never "SHOIRLY", never "ShoIRLY".

---

## 3. Colour

### Core palette

| Token | Hex | Role |
|---|---|---|
| `--sh-blue` | `#2F5BFF` | Electric Blue. Mark, primary buttons, links, verified states, key graphics. |
| `--sh-ink` | `#0B1220` | Near Black. Text, dark sections, footer. |
| `--sh-white` | `#FFFFFF` | Primary background. |

Full blue and gray scales plus status colours are in `tokens.css`. Use semantic tokens (`--sh-bg`, `--sh-text`, `--sh-accent`, `--sh-border` …) in components, so `[data-theme="dark"]` or `.sh-dark` on a section flips everything correctly.

### Proportions (per page, roughly)
- ~70% white / gray-25
- ~20% ink (text, one or two dark sections, footer)
- ~10% blue (mark, buttons, links, one hero graphic)

### Contrast rules (all checked)
- Blue `#2F5BFF` on white: 5.2:1. OK for text and buttons.
- White on blue: 5.2:1. OK for button labels.
- **Blue text on ink fails (3.6:1).** On dark backgrounds, blue *text and links* use `--sh-blue-300` `#7B97FF` (6.9:1). Blue *fills and the mark* stay `#2F5BFF`.
- Secondary text on white: `--sh-gray-500` `#5B6680` (5.7:1). Never lighter for body text.
- Secondary text on ink: `--sh-gray-300` `#A9B2C5` (8.8:1).
- Status colours are tuned for AA on white; on ink the dark theme swaps in lighter versions automatically.

### Never
Gradients (including subtle background washes), glows, neon effects, colour other than this palette, green as a brand colour (success states only), translucent glassmorphism panels.

---

## 4. Typography

Three families, each with one job.

| Role | Family | Weights | Use |
|---|---|---|---|
| Display | **Space Mono** | 400, 700 | Hero headline, H1, H2, the occasional big statement. Echoes the wordmark. |
| Body | **IBM Plex Sans** | 400, 500, 600 | Paragraphs, H3/H4, nav, buttons, forms. Readable at length. |
| Mono | **IBM Plex Mono** | 400, 500 | Labels, data, code, hashes, timestamps, table figures, audit-log UI. |

Why not all mono: monospace body copy is tiring to read on a trust page that security reviewers actually read. Space Mono carries the brand at large sizes; Plex Sans carries the reading; Plex Mono carries the evidence.

### Loading (Next.js)
```ts
import { Space_Mono, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
export const display = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-display", display: "swap" });
export const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
export const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
```
Then point `--sh-font-display/body/mono` at those variables (keep the fallbacks).

### Scale

| Style | Font | Size | Line height | Tracking | Weight |
|---|---|---|---|---|---|
| Display | Space Mono | 44 → 80px fluid | 1.1 | −0.04em | 400 |
| H1 | Space Mono | 36 → 56px fluid | 1.1 | −0.04em | 400 |
| H2 | Space Mono | 28 → 40px fluid | 1.25 | −0.02em | 400 |
| H3 | Plex Sans | 24px | 1.25 | −0.01em | 600 |
| H4 | Plex Sans | 20px | 1.3 | 0 | 600 |
| Lead | Plex Sans | 20px | 1.5 | 0 | 400 |
| Body | Plex Sans | 17px | 1.6 | 0 | 400 |
| Small | Plex Sans | 15px | 1.5 | 0 | 400 |
| Label | Plex Mono | 13px | 1.4 | 0.04em | 500 |
| Micro | Plex Mono | 12px | 1.4 | 0.02em | 400 |

### Rules
- Headlines in **sentence case**, short, ideally under 8 words. Space Mono is wide, so headlines need short lines; max ~16ch for display, ~22ch for H1.
- **Labels are lowercase mono** (`how it works`, `evidence pack`), at 13px in `--sh-text-muted` or `--sh-accent-text`. Not ALL CAPS. Use them only where they genuinely help orientation, not above every heading.
- **Numbers (01, 02, 03) only for real sequences**, like the steps of how the product works. Never as decoration on unordered content.
- Don't highlight a single word in a headline with colour or italics. Let the whole line carry it.
- Body copy max width `--sh-measure` (68ch). Left-aligned. Never justified. Centre-align only short hero or CTA blocks.
- Hashes, IDs, timestamps and code always in Plex Mono, ideally real-looking but obviously sample (e.g. `sig: 9f3a…c01d`).

---

## 5. Layout and spacing

- **Grid:** 12 columns, `--sh-container` 1200px (1360px for wide product visuals), gutter `--sh-gutter`. Content is **left-aligned** to the grid by default.
- **Spacing:** 4px base. Use only the `--sh-space-*` steps. Section vertical padding `--sh-section-y` (64 → 128px).
- **Breakpoints:** 640 / 768 / 1024 / 1280. Design mobile-first. At ≤768 everything stacks; nav collapses to a menu button; display type uses the fluid minimum.
- **Rhythm:** alternate white and gray-25 sections; use an ink section at most two or three times per long page (e.g. product proof and final CTA). Separate same-colour sections with a 1px `--sh-border` hairline, not extra space.
- **Asymmetry:** prefer 7/5 or 8/4 splits (copy left, visual right) over centred stacks. The cropped mark or the visual can bleed off the right edge of the container.

```
Typical section (desktop)
┌───────────────────────────────────────────────────────────────┐
│ label                                                         │
│ H2 headline in Space Mono           ┌───────────────────────┐ │
│ (cols 1–6)                          │  visual / evidence    │ │
│ Body copy, max 68ch                 │  card / cropped mark  │ │
│ [Primary] [Secondary]               │  (cols 8–12, may bleed)│ │
│                                     └───────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

---

## 6. Shape, borders, elevation

- **Radius:** mostly square. `0` for sections, panels and images; `2px` for buttons, inputs and tags; `4px` for cards and code blocks. Only the app icon is rounded (22.5%). Never pill-shaped buttons.
- **Chamfer:** feature panels may have **one clipped corner** (top-right, 14px, via `clip-path`). This is the signature panel shape; use it on a handful of key panels, not every card.
- **Borders:** 1px `--sh-border`. Borders do the work shadows usually do.
- **Elevation:** flat. `--sh-shadow-pop` only for menus, popovers and dialogs.

---

## 7. Graphic motifs

Use these instead of stock illustration. Each must look like it belongs on a record or a blueprint.

1. **Cropped oversized mark.** The mark at 400 to 900px, cropped by the section or viewport edge, in blue on white, or blue on ink. The hero's default visual. One per page, maybe one more on a dark CTA.
2. **Corner brackets.** Four (or two diagonal) L-shaped corners, `--sh-bracket-size` 14px, 2px, in `--sh-accent`, framing a single focal element: a quote, a key statement, a product screenshot. Max one per viewport. It echoes the mark's open frame.
3. **Construction lines.** The mark redrawn as 1px outlines in `--sh-line`, with dashed guides and 45° diagonals, like a blueprint. Behind hero or section headers, low contrast, never behind body text.
4. **Audit trail.** A vertical 1px line with small square nodes (8px), the latest node filled blue, others outlined. Used for "how it works" timelines, changelogs and any event list. Square nodes, never circles.
5. **Square bullets.** Small 8px blue squares as list or card-title markers instead of dots or icons.
6. **Node graph.** Thin lines connecting small square nodes, one filled blue. Only as a faint background texture on dark sections, low opacity.

**Never use:** padlocks, shields, keys, robots, glowing brains, circuit-board clichés, globe-with-network images, wax seals or badges, stock photos of people at laptops, 3D renders, emoji.

---

## 8. Components

All interactive elements: minimum 44px touch target, visible focus ring (`2px solid var(--sh-focus)`, 2px offset), keyboard operable, real `<button>` / `<a>` elements.

### Buttons
| Variant | Look | Use |
|---|---|---|
| Primary | Blue fill, white Plex Sans 500 16px, 2px radius, 12px × 20px padding. Hover `--sh-accent-hover`. | One per view: "Book a demo". |
| Secondary | 1px `--sh-text` border, transparent fill, text colour. Hover fills `--sh-bg-subtle`. | Alternatives: "See how it works". |
| Ghost / text link | Accent text, underline on hover, no arrow glyph. | Inline and tertiary actions. |

On ink sections, primary stays blue with white text; secondary uses a white 1px border. Labels say exactly what happens ("Book a demo", "Read the security overview"), never "Submit" or "Learn more →".

### Navigation
White bar, 64px tall, 1px bottom border, logo left (Logo `height={26}`), 4 or 5 links in Plex Sans 15px, primary button right. Sticky with the border appearing only after scroll. Mobile: logo + menu button opening a full-height ink sheet.

### Cards and panels
White surface, 1px border, 4px radius, 24 to 32px padding, square-bullet title marker optional. No shadows, no hover lift. Key feature panels use the chamfered corner. Don't build pages out of identical card grids; vary sizes and let one panel lead.

### Evidence card (signature component)
The product's core object, used in the hero and product sections. A panel showing one agent action as a record:
```
┌─────────────────────────────────────────────┐╲  (chamfer)
│ ■ action  refund.issue                      │
│ agent     support-agent@v3.2                │
│ approved  j.murphy (human)    14:02:11 UTC  │
│ sig       9f3a…c01d            ✓ verified   │
└─────────────────────────────────────────────┘
```
Plex Mono 13 to 14px, labels in muted text, values in text colour, the verified state in `--sh-accent-text` with the tick from the mark. All values are clearly sample data.

### Code blocks
`--sh-gray-950` background on any page, Plex Mono 14px, 4px radius, blue-300 for keys and strings in a minimal two-colour highlight theme.

### Tags and status
Plex Mono 12px, 2px radius, 4px × 8px. Neutral: gray-50 fill. Verified: blue-50 fill + blue-600 text. Status colours only for real states (pass, warning, fail).

### Forms
Inputs: 44px tall, 1px `--sh-border-strong`, 2px radius, Plex Sans 16px, label above in Plex Sans 14px 500. Focus: blue border + focus ring. Errors: danger text under the field, saying what's wrong and how to fix it.

### Tables
Plex Sans for text columns, Plex Mono for figures, IDs and dates. 1px row dividers, no zebra stripes, sticky header on long tables, horizontal scroll inside its own container on mobile.

### Footer
Ink section. Logo (`tone="dark"`), short one-line description, link columns in Plex Sans 15px gray-300, legal line in Plex Mono 12px. Contact `hello@shoirly.com`.

---

## 9. Motion

- Quiet by default. Hover and focus transitions `--sh-dur-fast` (120ms) on colour and border only. No scale, no lift, no parallax.
- **One signature moment:** on the hero, the tick draws in (stroke-dashoffset on an outline version of the tick, `--sh-dur-slow`, `--sh-ease`) after the frame appears. Once, on load. Optionally evidence-card rows type in sequentially.
- No scroll-triggered fade-ins on every section.
- Respect `prefers-reduced-motion` (tokens already zero the durations; also skip the draw animation entirely).

---

## 10. Page patterns

### Home
1. **Hero (white):** label, display headline from the pitch line, one lead sentence, primary + secondary button. Right: evidence card, with the cropped oversized mark bleeding off the right edge behind it. Optional faint construction lines.
2. **Problem:** short H2 + two-column copy about stalled security reviews. No stats unless real and sourced.
3. **How it works (numbered, a real sequence):** audit-trail motif with 3 or 4 steps (capture, sign, check coverage, share evidence pack).
4. **Product proof (ink):** larger product visual or evidence pack preview inside corner brackets.
5. **For buyers:** what a bank's security team gets. Plain list with square bullets.
6. **Trust/security teaser:** link to the security page.
7. **Final CTA (ink or blue):** one line + "Book a demo". The second allowed cropped mark lives here.
8. **Footer (ink).**

### Security / trust page
Documentation-like: left sticky table of contents (desktop), single 68ch reading column, H2s in Space Mono, lots of Plex Mono for technical specifics. Minimal graphics; this page earns trust through clarity.

### Blog
Index: list layout (title in Plex Sans 600 22px, date in Plex Mono, one-line summary), not a card grid. Post: 68ch column, H2 in Space Mono, code blocks per section 8, no hero stock images; optional construction-line header graphic.

### Wireframe: hero
```
┌──────────────────────────────────────────────────────────────────┐
│ [logo]            Product  Security  Blog  About     [Book a demo]│
├──────────────────────────────────────────────────────────────────┤
│ for AI agent companies                                    ███████│
│ Certs show your AI agent                    ┌──────────────┐ ██   │
│ passed tests.                               │ evidence card│ ██   │
│ Shoirly shows what it                       │              │ ██ ╲ │
│ actually did.                               └──────────────┘ ██  ╲│
│ Lead sentence, one line.                               ██████   ╱ │
│ [Book a demo]  [See how it works]                (cropped mark) ╱ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 11. Voice and copy

- **Plain, specific, evidential.** Say what the product does in concrete terms: "every action your agent takes is signed and timestamped, with who approved it."
- **Short sentences.** Active voice. Sentence case. Irish/British spelling (colour, organisation, authorise).
- **Talk to the vendor, respect the reviewer.** The reader is selling to a bank; the person checking the page might be the bank.
- **Words to avoid:** revolutionary, seamless, cutting-edge, unlock, supercharge, game-changing, AI-powered (as filler), "trust us".
- **Never invent:** customer names or logos, metrics, testimonials, certifications (SOC 2, ISO), integrations or partnerships. If a section needs one that doesn't exist yet, leave a clearly marked placeholder like `[CUSTOMER QUOTE]` and list it in `DECISIONS.md`.
- **Sample data** in product visuals must look plausible but obviously illustrative, never presented as real results.
- Buttons and links name the action. Errors say what happened and how to fix it, without apologising.

---

## 12. Accessibility

WCAG 2.2 AA minimum. Contrast pairs in section 3 are the allowed ones. Visible focus everywhere. Semantic HTML landmarks (`header`, `nav`, `main`, `footer`), one H1 per page, logical heading order. Logo has `aria-label="Shoirly"` (or is hidden when a visible name sits beside it). Decorative graphics `aria-hidden`. Text never baked into images. Pages work at 320px wide and at 200% zoom. Motion respects reduced-motion.

---

## 13. Redesign checklist

- [ ] `tokens.css` installed; no raw hexes, font names or arbitrary spacing in components.
- [ ] Old logo, seal assets, Bricolage Grotesque and old colours removed everywhere.
- [ ] Logo via `Logo.tsx`; favicon, apple-touch-icon, PWA icons and OG image replaced and referenced in metadata.
- [ ] Three fonts loaded with `display: swap`; display font only on display/H1/H2.
- [ ] Blue text on ink uses blue-300.
- [ ] One primary button per view; labels name the action.
- [ ] Max one cropped mark and one bracketed focal element per viewport; no gradients, glows or stock imagery.
- [ ] Numbered labels only on real sequences; labels lowercase mono.
- [ ] No invented customers, stats, certifications or integrations; placeholders logged in `DECISIONS.md`.
- [ ] Responsive at 320 / 768 / 1280; keyboard and focus checked; reduced motion respected.
