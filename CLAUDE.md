# Shoirly website: project brief

This file is the source of truth for the Shoirly marketing site. Read it fully before any task. If something here conflicts with a later prompt, the prompt wins, then update this file so it stays true.

## The company

Shoirly gives AI agent vendors signed, per-customer evidence of what their agent did and who authorised each action. A coverage check proves nothing went unrecorded, and the output is mapped to the controls banks care about, starting with DORA.

- **Who buys:** AI agent startups (seed to Series B) selling into banks, insurers and payment firms in the EU and UK.
- **Their pain:** deals stall in the bank's security review and vendor due diligence. A SOC 2 or ISO cert helps a bank shortlist a vendor, but on its own it usually isn't enough. Today the bank's evidence is contract clauses plus periodic service reviews. Nothing shows what the vendor's system actually did on a given day, for a given action.
- **Why now:** DORA gives banks audit and information rights over their ICT third parties, and supervisors are paying close attention to AI. Banks will give agents more autonomy, but only inside defined risk tolerances, with proof the controls held.
- **Positioning line:** "Vanta proves you have controls. We prove they held." Shoirly plugs into Vanta and trust centres. It does not replace them.
- **Second audience:** risk, procurement and third-party oversight teams at banks, who receive the evidence.
- **Context:** four-person founding team in Dublin, competing in Baseline's Pressure Cooker during Dublin AI Week (Oct 2026). Judges and investors will look at this site, so it has to read as a real, credible company.

### Honesty rules (non-negotiable)

- No fake customer logos, testimonials, user counts, certifications or funding claims.
- No invented technical specifics (SDK languages, hosting regions, cert status, uptime). Where a detail is unknown, write a sensible placeholder and mark it `TODO(team):` in code so it's easy to find.
- Any number used to show cost or time saved is labelled as illustrative or as an estimate the visitor controls.
- Compare against categories ("certs", "gateway logs", "questionnaires"), not named competitors, except the Vanta line above.

## Site goals

1. Book demos with AI agent vendors. Every page has one clear path to "Book a demo".
2. Look credible and polished to judges and investors.
3. Explain the product visually: an animated walkthrough of how it works, what the evidence looks like, and what a stalled deal costs.

## Site map

| Route | Purpose |
|---|---|
| `/` | Home. Hero, problem, how it works (animated), evidence pack preview, cost-of-a-stalled-deal calculator, works-with-your-trust-centre, for vendors / for banks split, final CTA |
| `/product` | Deeper how-it-works: capture, sign, coverage check, evidence pack. Interactive diagram |
| `/solutions/agent-vendors` | For the buyer: close bank deals faster |
| `/solutions/banks` | For the receiving side: what a risk team gets and how to request it |
| `/dora` | Plain-English DORA explainer and how Shoirly evidence maps to it. Strong SEO page |
| `/security` | Trust page: how evidence is signed and verified, data handling, what we store and don't. Unknowns marked TODO |
| `/about` | Mission, team of four, Dublin |
| `/blog` + `/blog/[slug]` | MDX blog |
| `/demo` | Book a demo |
| `/privacy`, `/terms` | Placeholder legal pages, clearly marked draft |
| `404` | On-brand not-found page |

Nav: Product, Solutions (Agent vendors, Banks), DORA, Security, Blog, About, plus a "Book a demo" button. Footer carries the full map, hello@shoirly.com and "Made in Dublin".

## Tech

- Next.js (App Router, TypeScript), Tailwind CSS, `motion` (Framer Motion) for animation, MDX for the blog.
- Deployed on Vercel at shoirly.com (DNS on Cloudflare; shoirly.ie redirects to .com).
- One config file, `src/config/site.ts`, holds the contact email (hello@shoirly.com), booking URL (`TODO(team)`, use a mailto until we have Cal.com), social links and nav. No hardcoded contact details anywhere else.
- Logo lives in one component, `src/components/brand/Logo.tsx`, so it can be swapped in a single place. Until the real logo arrives, use a clean typographic wordmark.
- Use react-bits (cloned for reference, see below) selectively. Copy individual components into `src/components/fx/`, adapt them to our tokens, credit the source in a comment. Never pull in the whole library.
- Quality floor: Lighthouse 90+ on all four scores, semantic HTML, keyboard focus visible, `prefers-reduced-motion` respected everywhere, no layout shift from animations, works from 360px to 1920px.

## Design direction

Light, trustworthy enterprise, in the family of secureframe.com and sprinto.com, but with its own identity. Study those sites for structure, rhythm and polish. Never copy their copy, assets, illustrations or exact layouts.

The subject is evidence: signatures, chains of custody, receipts, audit files, a verified seal. Draw the visual language from that world rather than from generic SaaS. The one memorable element should be the hero's evidence animation. Keep everything around it calm and disciplined.

- **Palette:** mostly white and a cool off-white, deep ink for text, one confident accent that reads as "verified". Propose 4 to 6 named hex values in `DECISIONS.md` before building. Avoid purple-to-blue gradient washes (every compliance site uses them) and the defaults listed below.
- **Type:** one or two deliberately chosen families, not Inter by default. A clear type scale. Sentence case everywhere.
- **Motion:** one orchestrated hero moment, scroll-linked storytelling in "how it works", and motion that responds to the user. No fade-up on every section, no hover wobble on every card. Smooth, short, eased.
- **Avoid these generated-site tells:** all-caps eyebrow labels above every heading, one highlighted word in a headline, identical rounded cards with the same grey shadow, gradient blobs as decoration, `A · B · C` meta strings, `→` on every link, numbered 01/02/03 markers unless the content really is a sequence (how it works is a sequence, so it can use them).

### Hero animation concept

A live "evidence trail": a stream of agent actions (e.g. "Refund €240 to customer #4471", "Read KYC file", "Update credit limit") flows in. Each action gets linked to the human or policy that authorised it, receives a signature, and joins a tamper-evident chain. A coverage meter fills to 100%. The trail compiles into a per-customer evidence pack card labelled with the DORA areas it covers. One tasteful loop, pausable, static frame under reduced motion.

### Cost-of-a-stalled-deal calculator

Sliders for deals in pipeline with banks, average contract value, and weeks stuck in security review. Output: revenue delayed this year and the effect of cutting review time. Clearly labelled as an estimate based on the visitor's own inputs.

## Copy

Voice: plain, confident, specific. Written for a founder or CTO at an agent startup, credible to a bank's head of third-party risk. British/Irish spelling. No em dashes. No hype words ("revolutionary", "seamless", "unlock", "supercharge").

Starting copy (refine, don't replace the meaning):

- **Hero headline:** Signed proof of what your AI agent did, and who approved it.
- **Hero sub:** Shoirly gives AI agent vendors per-customer evidence of every action, mapped to DORA, so bank security reviews stop stalling your deals.
- **CTAs:** "Book a demo" (primary), "See how it works" (secondary, scrolls to the walkthrough).
- **Problem:** Banks want to let your agent do more. Their risk team needs proof it stayed inside the lines. A certificate says you have controls. It doesn't show what happened on Tuesday.
- **How it works (a real sequence):** 1. Connect your agent. 2. Every action is signed and linked to who authorised it. 3. A coverage check proves nothing went unrecorded. 4. Share a per-customer evidence pack, mapped to DORA, straight into your trust centre.
- **Trust centre section:** Vanta proves you have controls. We prove they held.

## Reference material

- Inspiration sites: https://secureframe.com and https://sprinto.com (capture with the playwright-cli skill, save to `research/`, which is gitignored).
- Components: https://github.com/DavidHDev/react-bits (clone to a sibling folder `../react-bits`, not into this repo).
- Skills to use: design-taste-frontend, high-end-visual-design, web-design-guidelines (for audits), playwright-cli (for screenshots and self-review), image-to-code (when given a mockup or logo).

## Working rules

- Log every design and product decision you make without asking in `DECISIONS.md` (one line each, with the reason).
- After any visual change, screenshot the affected pages with playwright-cli at 1440px and 390px, look at them, and fix what looks off before finishing.
- Run `npm run build` and `npm run lint` before declaring a task done. Fix all errors.
- Commit at the end of each task with a clear message. Don't push unless asked.
