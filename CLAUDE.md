# Shoirly website: project brief

This file is the source of truth for the Shoirly marketing site. Read it fully before any task. If something here conflicts with a later prompt, the prompt wins, then update this file so it stays true.

## The company

Shoirly gives AI agent companies independent, verifiable evidence of what their agent did and who authorised each action. Vendors already say "we log everything". Shoirly makes those records provably complete and unedited, per customer: each action is signed and chained, a coverage check shows whether anything went unrecorded, and the output is mapped to the controls regulated buyers check, starting with DORA for EU financial services.

- **Who buys:** AI agent companies selling to any regulated buyer. Finance (banks, payment firms and insurers, under DORA) is where we start, not the whole company.
- **Default wording:** "your customers", "regulated buyers" or "your buyer's risk team". Banks, insurers and DORA appear only as examples (at most one finance example per section, phrased "for example" or "starting with"), or on pages that are specifically about them: `/dora`, `/solutions/banks`, and blog posts about finance.
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
| `/solutions/banks` | Finance-specific page for the receiving side (banks, payment firms and insurers): what a risk team gets and how to request it |
| `/dora` | Finance-specific: plain-English DORA explainer and how Shoirly evidence maps to it. Strong SEO page |
| `/security` | Trust page: how evidence is signed and verified, where Shoirly runs and what leaves, what we're building next (roadmap, clearly not yet available). Unknowns marked TODO |
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
- **Logo (final):** files live in `public/brand/` (read its `README.md` for usage rules). `src/components/brand/Logo.tsx` is the only place the logo is drawn: `logo.svg` on light backgrounds, `logo-white.svg` on dark ones. The favicon set, apple touch icon and manifest icons come from `mark.svg`, and every page's social image (`src/lib/ogImage.tsx`, served from `/og/...`) uses `logo.svg`. Page titles and descriptions live in `pageSeo` in `src/lib/metadata.ts`. Don't redraw, recolour or stretch the logo. The header shows the full wordmark at 36px, a deliberate exception to the README's "mark only below ~48px" rule (see DECISIONS.md).
- Use react-bits (cloned for reference, see below) selectively. Copy individual components into `src/components/fx/`, adapt them to our tokens, credit the source in a comment. Never pull in the whole library.
- Quality floor: Lighthouse 90+ on all four scores, semantic HTML, keyboard focus visible, `prefers-reduced-motion` respected everywhere, no layout shift from animations, works from 360px to 1920px.

## Design direction

Light, trustworthy enterprise, in the family of secureframe.com and sprinto.com, but with its own identity. Study those sites for structure, rhythm and polish. Never copy their copy, assets, illustrations or exact layouts.

The subject is evidence: signatures, chains of custody, receipts, audit files, a verified seal. Draw the visual language from that world rather than from generic SaaS. The one memorable element should be the hero's evidence animation. Keep everything around it calm and disciplined.

- **Palette:** mostly white and a cool off-white, deep ink for text, one confident accent that reads as "verified". Ink `#0F1B17` and the accent, Seal blue `#3157F0`, come from the logo; the full token set is in `DECISIONS.md` and `src/app/globals.css`. Avoid purple-to-blue gradient washes (every compliance site uses them) and the defaults listed below.
- **Type:** headings in Bricolage Grotesque (the family the wordmark is drawn from), body in Schibsted Grotesk, data in IBM Plex Mono. A clear type scale. Sentence case everywhere.
- **Motion (updated 3 Oct 2026: the founders want the site to feel more alive and modern):** a living hero (the evidence-trail animation, a cursor-reactive drifting ledger grid behind it, layered depth that tilts with the pointer), eye-catching page transitions (View Transitions: the old page recedes, the new page rises, the header stays anchored), scroll-linked storytelling, scroll-driven heading reveals, and tactile press and hover feedback. Still: transform and opacity only, zero layout shift, everything paused off-screen, a calm static fallback under reduced motion, no cursor gimmicks, no full-page moving backgrounds, no hover wobble on cards. Smooth, eased, critically damped springs unless a gesture carried momentum.
- **Avoid these generated-site tells:** all-caps eyebrow labels above every heading, one highlighted word in a headline, identical rounded cards with the same grey shadow, gradient blobs as decoration, `A · B · C` meta strings, `→` on every link, numbered 01/02/03 markers unless the content really is a sequence (how it works is a sequence, so it can use them).

### Hero animation concept

A live "evidence trail": a stream of agent actions (e.g. "Refund €240 to customer #4471", "Read KYC file", "Update credit limit") flows in. Each action gets linked to the human or policy that authorised it, receives a signature, and joins a tamper-evident chain. A coverage meter fills to 100%. The trail compiles into a per-customer evidence pack card labelled with the DORA areas it covers. One tasteful loop, pausable, static frame under reduced motion.

### Cost-of-a-stalled-deal calculator

Sliders for deals with regulated buyers, average contract value, and weeks stuck in security review. Output: revenue delayed this year and the effect of cutting review time. Clearly labelled as an estimate based on the visitor's own inputs.

## Copy

Voice: plain, confident, specific. Written for a founder or CTO at an agent startup, credible to a regulated buyer's head of third-party risk (for example, at a bank). British/Irish spelling. No em dashes. No hype words ("revolutionary", "seamless", "unlock", "supercharge").

Starting copy (refine, don't replace the meaning):

- **Hero headline:** Signed proof of what your AI agent did, and who approved it.
- **Hero sub:** Shoirly gives AI agent companies per-customer evidence of every action, mapped to the controls regulated buyers check, so security reviews stop stalling your deals.
- **CTAs:** "Book a demo" (primary), "See how it works" (secondary, scrolls to the walkthrough).
- **Problem:** Your customers want to let your agent do more. Their risk team needs proof it stayed inside the lines. A certificate says you have controls. It doesn't show what happened on Tuesday.
- **How it works (a real sequence):** 1. Connect your agent. 2. Every action is signed and linked to who authorised it. 3. A coverage check shows whether anything went unrecorded. 4. Share a per-customer evidence pack, mapped to your buyer's controls (for example, DORA), through Vanta or your trust centre.
- **Trust centre section:** Vanta proves you have controls. We prove they held.
- **Deployment section:** Your data never leaves. Only the proof does.
- **Stage line (near CTAs):** We're early and taking on design partners.

## Reference material

- Inspiration sites: https://secureframe.com and https://sprinto.com (capture with the playwright-cli skill, save to `research/`, which is gitignored).
- Components: https://github.com/DavidHDev/react-bits (clone to a sibling folder `../react-bits`, not into this repo).
- Skills to use: design-taste-frontend, high-end-visual-design, web-design-guidelines (for audits), playwright-cli (for screenshots, only when a phase asks), image-to-code (when given a mockup or logo).

## Working rules

- Log every design and product decision you make without asking in `DECISIONS.md` (one line each, with the reason).
- Only take screenshots when a phase explicitly asks for them. Default to none.
- When asked, screenshot only the pages you changed, once. Fix obvious problems in one round, then stop. No repeated screenshot-fix loops.
- Copy and content changes never need screenshots. Build and lint are enough.
- Run `npm run build` and `npm run lint` before declaring a task done. Fix all errors.
- Commit at the end of each task with a clear message. Don't push unless asked.
