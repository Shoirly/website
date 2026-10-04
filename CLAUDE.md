# Shoirly website: project brief

This file is the source of truth for the Shoirly marketing site. Read it fully before any task. If something here conflicts with a later prompt, the prompt wins, then update this file so it stays true.

## The company

Shoirly gives AI agent companies independent, verifiable evidence of what their agent did and who authorised each action. Vendors already say "we log everything". Shoirly makes those records provably complete and unedited, per customer: each action is signed and chained, a coverage check shows whether anything went unrecorded, and the output is mapped to the controls regulated buyers check, starting with DORA for EU financial services.

- **Who buys:** AI agent companies selling to any regulated buyer. Finance (banks, payment firms and insurers, under DORA) is where we start, not the whole company.
- **Default wording:** "your customers", "regulated buyers" or "your buyer's risk team". Banks, insurers and DORA appear only as examples (at most one finance example per section, phrased "for example" or "starting with"), or on pages that are specifically about them: `/dora` and blog posts about finance. Aim for no more than about one finance example per page, not just per section. Sample data stays industry-neutral.
- **Their pain:** deals stall in the buyer's security review and vendor due diligence. A SOC 2 or ISO cert helps a buyer shortlist a vendor, but on its own it usually isn't enough. Today the buyer's evidence is contract clauses plus periodic service reviews. Nothing shows what the vendor's system actually did on a given day, for a given action.
- **Why now:** regulators are paying close attention to AI, and regulated buyers will give agents more autonomy only inside defined risk tolerances, with proof the controls held. In EU financial services, for example, DORA gives firms audit and information rights over their ICT third parties.
- **Where we sit:**
  - Certifications like SOC 2 and AIUC-1 show an agent passed tests at a point in time. We show what it did on Tuesday.
  - Guardrail tools block actions. We prove them.
  - Trust centres and vendor-risk tools run on documents. Our packs are live evidence they can carry.
- **Positioning line:** "Vanta proves you have controls. We prove they held." Shoirly works alongside Vanta and trust centres. It does not replace them.
- **Deployment:** Shoirly is designed to run where the agent runs (the vendor's cloud or their customer's). Say "designed to run", not "runs", until deployments are live. Raw data stays there. Only signatures, hashes and coverage counts leave. Line: "Your data never leaves. Only the proof does."
- **Architecture:** the agent calls its tools through the Shoirly proxy. Each call is linked to its authoriser, signed, added to a chain, and counted by the coverage check. Only proof leaves the environment for the evidence pack. SDK languages and supported frameworks are still unknown (`TODO(team)`).
- **Roadmap (never present as shipped):** hardware-isolated signing, eIDAS qualified timestamps, trust-centre integrations. Always mark these as not yet available.
- **Stage:** early, taking on design partners. Say so plainly where it helps.
- **Second audience:** risk, procurement and third-party oversight teams at regulated buyers, who receive the evidence (starting with banks, payment firms and insurers).
- **Context:** four-person founding team in Dublin, competing in Baseline's Pressure Cooker during Dublin AI Week (Oct 2026). Judges and investors will look at this site, so it has to read as a real, credible company.

### Honesty rules (non-negotiable)

- No fake customer logos, testimonials, user counts, certifications or funding claims.
- No invented technical specifics (SDK languages, hosting regions, cert status, uptime). Where a detail is unknown, write a sensible placeholder and mark it `TODO(team):` in code so it's easy to find.
- Any number used to show cost or time saved is labelled as illustrative or as an estimate the visitor controls.
- Compare against categories ("certs", "gateway logs", "questionnaires", "guardrail tools"), not named competitors, except the Vanta line above. Naming a standard such as SOC 2 or AIUC-1 is fine.
- Never imply a shipped integration with Vanta or any other platform. Say "packs you can share through Vanta or your trust centre".
- The coverage check "shows whether anything went unrecorded". Never say it "proves nothing went unrecorded".
- Don't claim buyers can verify evidence independently today. Say they will be able to once the verification guide is published.

## Site goals

1. Book demos with AI agent vendors. Every page has one clear path to "Book a demo".
2. Look credible and polished to judges and investors.
3. Explain the product visually: an animated walkthrough of how it works, what the evidence looks like, and what a stalled deal costs.

## Site map

| Route | Purpose |
|---|---|
| `/` | Home. Hero, problem, how it works (animated), evidence pack preview, where it runs (only proof leaves), cost-of-a-stalled-deal calculator, works-with-your-trust-centre, for vendors / for buyers' risk teams split, final CTA |
| `/product` | Deeper how-it-works: capture, sign, coverage check, evidence pack. Interactive diagram |
| `/solutions/agent-vendors` | For AI agent companies: close deals with regulated buyers faster |
| `/solutions/banks` | For buyers' risk teams at any regulated business (starting with banks, insurers and payment firms): what they receive and how to request it. URL kept for existing links |
| `/dora` | Finance-specific: plain-English DORA explainer and how Shoirly evidence maps to it. Strong SEO page |
| `/security` | Trust page: how evidence is signed and verified, where Shoirly runs and what leaves, what we're building next (roadmap, clearly not yet available). Unknowns marked TODO |
| `/about` | Mission, team of four, Dublin |
| `/blog` + `/blog/[slug]` | MDX blog |
| `/demo` | Book a demo |
| `/privacy`, `/terms` | Placeholder legal pages, clearly marked draft |
| `404` | On-brand not-found page |

Nav: Product, Solutions (For AI agent companies, For buyers' risk teams), Security, Blog, About, plus a "Book a demo" button. Footer: Product, Solutions, Resources (Blog, DORA guide), Company (About, Privacy, Terms), hello@shoirly.com and "Made in Dublin".

## Tech

- Next.js (App Router, TypeScript), Tailwind CSS, `motion` (Framer Motion) for animation, MDX for the blog.
- Deployed on Vercel at shoirly.com (DNS on Cloudflare; shoirly.ie redirects to .com).
- One config file, `src/config/site.ts`, holds the contact email (hello@shoirly.com), booking URL (`TODO(team)`, use a mailto until we have Cal.com), social links and nav. No hardcoded contact details anywhere else.
- **Logo and brand assets:** `src/components/brand/Logo.tsx` (copied from `shoirly-brand/Logo.tsx`) is the only place the logo is drawn; `src/components/brand/CroppedMark.tsx` reuses its geometry for the cropped-mark motif and the verified tick. Logo files are in `public/brand/`; the favicon set, apple-touch-icon, PWA icons and `og-image.png` are in `public/`, wired up in `src/app/layout.tsx`, `src/app/manifest.ts` and `src/lib/metadata.ts` (every page shares the one OG image). Page titles and descriptions live in `pageSeo` in `src/lib/metadata.ts`. Don't redraw, recolour or stretch the logo.
- Quality floor: Lighthouse 90+ on all four scores, semantic HTML, keyboard focus visible, `prefers-reduced-motion` respected everywhere, no layout shift from animations, works from 360px to 1920px.

## Design direction

**`shoirly-brand/BRAND.md` is the design source of truth.** Read it in full before any visual change. It overrides anything in this file, `DECISIONS.md` or the existing code that conflicts with it. Older design entries in `DECISIONS.md` (green/blue "seal" palette, Bricolage and Schibsted type, the animated hero) are history and no longer apply.

How it is wired in this codebase:

- **Tokens:** `src/app/tokens.css` is a verbatim copy of `shoirly-brand/tokens.css`. `src/app/globals.css` maps the `--sh-*` variables into Tailwind as `sh-*` classes (`bg-sh-bg`, `bg-sh-bg-subtle`, `text-sh-text`, `text-sh-muted`, `border-sh-border`, `bg-sh-accent`, `text-sh-accent-text`...), the type scale (`text-display`, `text-4xl` = H1 ... `text-xs` = mono label) and radii (`rounded-sm` 2px, `rounded-md` 4px). Ink sections add the `sh-dark` class so the semantic tokens flip. No raw hex values, font names or arbitrary spacing in components; if a value is missing, add it as a token first.
- **Fonts:** Space Mono (display, H1, H2), IBM Plex Sans (body, H3, H4), IBM Plex Mono (labels, data), loaded with `next/font/google` in `src/app/layout.tsx`.
- **Motifs and helpers in `globals.css`:** `label` (lowercase mono label, written in lowercase in the source), `chamfer` (the clipped top-right corner), `brackets` (corner brackets around one focal element), `square-bullet`, `link`, and `tick-draw` / `tick-fill` for the hero's one signature moment.
- **Motion:** BRAND.md section 9. Colour and border transitions only; the hero tick draw is the single signature moment. No scroll fade-ins, scale, lift, parallax or scripted sequences.

### Hero

Per BRAND.md section 10: lowercase mono label, the pitch line as the headline, one lead sentence, "Book a demo" plus "See how it works". On the right, the evidence card (one sample action from `src/content/sample.ts`, clearly marked as sample data) over the cropped oversized mark, whose tick draws in once on load.

### Cost-of-a-stalled-deal calculator

Sliders for deals with regulated buyers, average contract value, and weeks stuck in security review. Output: revenue delayed this year and the effect of cutting review time. Clearly labelled as an estimate based on the visitor's own inputs.

## Copy

Voice (see also BRAND.md section 11): plain, confident, specific. Written for a founder or CTO at an agent startup, credible to a regulated buyer's head of third-party risk (for example, at a bank). British/Irish spelling. No em dashes. No hype words ("revolutionary", "seamless", "unlock", "supercharge").

Starting copy (refine, don't replace the meaning):

- **Hero headline (the brand pitch line):** Certs show your AI agent passed tests. Shoirly shows what it actually did.
- **Hero sub:** Shoirly gives AI agent companies per-customer evidence of every action, mapped to the controls regulated buyers check, so security reviews stop stalling your deals.
- **CTAs:** "Book a demo" (primary), "See how it works" (secondary, scrolls to the walkthrough).
- **Problem:** Your customers want to let your agent do more. Their risk team needs proof it stayed inside the lines. A certificate says you have controls. It doesn't show what happened on Tuesday.
- **How it works (a real sequence):** 1. Connect your agent. 2. Every action is signed and linked to who authorised it. 3. A coverage check shows whether anything went unrecorded. 4. Share a per-customer evidence pack, mapped to your buyer's controls (for example, DORA), through Vanta or your trust centre.
- **Trust centre section:** Vanta proves you have controls. We prove they held.
- **Deployment section:** Your data never leaves. Only the proof does.
- **Stage line (near CTAs):** We're early and taking on design partners.

## Reference material

- Brand pack: `shoirly-brand/` (BRAND.md, tokens, logo component and SVG).
- Skills to use: design-taste-frontend, web-design-guidelines (for audits), playwright-cli (for screenshots, only when a phase asks), image-to-code (when given a mockup). Where a skill's defaults conflict with BRAND.md, BRAND.md wins.

## Working rules

- Log every design and product decision you make without asking in `DECISIONS.md` (one line each, with the reason).
- Only take screenshots when a phase explicitly asks for them. Default to none.
- When asked, screenshot only the pages you changed, once. Fix obvious problems in one round, then stop. No repeated screenshot-fix loops.
- Copy and content changes never need screenshots. Build and lint are enough.
- Run `npm run build` and `npm run lint` before declaring a task done. Fix all errors.
- Commit at the end of each task with a clear message. Don't push unless asked.
