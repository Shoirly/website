# Decisions

Design and product calls made without asking, one line each with the reason. Newest sections at the bottom.

## Design read

Reading this as: a B2B landing site for AI-agent founders and bank risk teams, in a trust-first, document-and-evidence language, built on Tailwind v4 utilities, two deliberate typefaces and motion that is restrained except for the hero. Dials: variance 5, motion 5, density 4. Trust-first sits lower than the marketing default, and the one hero moment carries the motion.

## Tokens

### Colour (6 named values)

| Name | Hex | Use |
|---|---|---|
| Paper | `#FCFDFC` | Page background. Off-white rather than pure white so the evidence pack card (pure paper) can sit above it. |
| Ledger | `#EEF2F0` | Cool off-white for alternate sections, wells and the calculator panel. A slight green-grey cast ties it to the accent. |
| Rule | `#D5DDDA` | Hairlines, borders and slider tracks. |
| Graphite | `#4D5C59` | Secondary text. 6.9:1 on Paper. |
| Ink | `#0D1B1E` | Primary text and the primary button. 17:1 on Paper. A deep blue-green black, not pure black. |
| Seal | `#0A7350` | The single accent, reading as "verified": signatures, ticks, coverage meter, focus ring, links. White text on Seal is 5.9:1. |

Supporting tints come from the same hues: `seal-wash` `#E2F1EA` (Seal at about 12% on Paper) for verified badges, and `ink-soft` (Ink at 8% alpha) for pressed states. There is no second hue. Errors use Ink plus a text label, not red, apart from the one "unrecorded" state in the hero, which uses a muted brick `#A4442B` because it has to read as a fault. I logged that exception here so it doesn't spread.

Why green rather than blue: every compliance and bank site uses navy or blue, and "verified" maps naturally to green. Secureframe uses a bright mint on navy, so our Seal is a deeper, inkier green on a light page to stay clearly distinct.

### Type

- **Display and body: Schibsted Grotesk** (variable, 400 to 700). It's a newspaper grotesk with firm, slightly condensed forms. It reads as reporting and record rather than startup, and it isn't Inter.
- **Data: IBM Plex Mono** (400, 500). Used for hashes, action records, timestamps and calculator figures. It has a document and ledger feel, and the tabular figures stop numbers jumping as they change.
- Sentence case everywhere. No all-caps labels.

Scale (rem at 16px root, with fluid clamps on the top three):

| Token | Size / line height | Use |
|---|---|---|
| `text-xs` | 13 / 18 | Mono meta, legal |
| `text-sm` | 15 / 22 | UI, nav, captions |
| `text-base` | 17 / 28 | Body |
| `text-lg` | 20 / 30 | Lead paragraphs |
| `text-xl` | 24 / 32 | H3 |
| `text-2xl` | clamp(28, 3.2vw, 36) / 1.15 | H2 small |
| `text-3xl` | clamp(32, 4.4vw, 48) / 1.08 | H2 |
| `text-4xl` | clamp(38, 5.6vw, 64) / 1.02 | H1 |

Headings: weight 600, tracking -0.02em at H1 and -0.015em at H2. Body: weight 400, max 64ch.

### Spacing

4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding is 96px desktop and 64px mobile (`py-16 md:py-24`). Content max width is 1200px with a 24px gutter (16px under 400px).

### Radii (one rule, used everywhere)

- 6px for cards, panels, buttons and inputs. Papers and receipts have slightly softened corners, not pills.
- 4px for small tags and badges.
- Full radius only for the slider thumb and the status tick (both are physically round).

### Shadow

Only on objects that are "paper" sitting on the page, which means the evidence pack card and the hero trail panel. Everything else uses a 1px Rule border or no container at all.

- `shadow-paper`: `0 1px 2px rgb(13 27 30 / 0.05), 0 12px 32px -12px rgb(13 27 30 / 0.18)`, tinted with Ink rather than black.

### Motion

| Token | Value | Use |
|---|---|---|
| `dur-fast` | 150ms | Hover and press feedback |
| `dur-base` | 240ms | Menus, tabs, small state changes |
| `dur-slow` | 420ms | Section reveals, hero row entry |
| `dur-story` | 700ms | Hero pack compile, step transitions |
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default for entering |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Morphs and position changes |
| spring | stiffness 260, damping 30 | Magnetic CTA and calculator figures only |

Under `prefers-reduced-motion`, everything shows its end state instantly. The hero shows a static, fully compiled frame. Only `transform` and `opacity` are animated, and every animated box has reserved dimensions so nothing shifts layout.

## Home page wireframe (1440px)

```
+------------------------------------------------------------------------------+
| [Shoirly]   Product  Solutions v  DORA  Security  Blog  About   [Book a demo] |  64px
+------------------------------------------------------------------------------+
|                                                                              |
|  Signed proof of what your AI        +-----------------------------------+   |
|  agent did, and who approved it.     | Evidence trail      [pause]       |   |
|                                      | > Refund EUR 240 to cust. #4471   |   |
|  Shoirly gives AI agent vendors      |   approved by: refunds policy v3  |   |
|  per-customer evidence of every      |   sig 9f3a..c21e  [tick]          |   |
|  action, mapped to DORA, so bank     | > Read KYC file                   |   |
|  security reviews stop stalling...   |   ...  chain o--o--o--o           |   |
|                                      | Coverage [=============== ] 100%  |   |
|  [Book a demo]  See how it works     |  -> compiles into                 |   |
|                                      |  [Evidence pack: Customer #4471]  |   |
|                                      |  DORA: ICT risk, 3rd party, logs  |   |
|                                      +-----------------------------------+   |
+------------------------------------------------------------------------------+
| PROBLEM (Ledger tint)                                                        |
|  Banks want to let your agent do more. Their risk team needs proof it        |
|  stayed inside the lines.                       (large editorial statement)  |
|                                                                              |
|  What they get today          What it shows        What it misses            |
|  ------------------------------------------------------------------------    |
|  Certificates (SOC 2, ISO)    Controls exist        What happened Tuesday    |
|  Questionnaires               What you say          What the system did      |
|  Gateway logs                 That calls happened   Who approved them        |
+------------------------------------------------------------------------------+
| HOW IT WORKS (sticky)                                                        |
|  +----------------------+     01 Connect your agent                          |
|  | sticky visual that   |     02 Every action is signed and linked ...       |
|  | changes with each    |     03 A coverage check proves nothing ...         |
|  | step as you scroll   |     04 Share a per-customer evidence pack ...      |
|  +----------------------+                                                    |
+------------------------------------------------------------------------------+
| WHAT THE EVIDENCE LOOKS LIKE                                                 |
|  Heading + one line                                                          |
|           +----------------------------------------+                         |
|  note ----| Evidence pack  Customer #4471  Sep 2026|---- note                |
|           | Coverage 100%  1,284 actions  0 gaps   |                         |
|  note ----| record rows with signature + approver  |---- note                |
|           | DORA mapping table                     |                         |
|           +----------------------------------------+                         |
+------------------------------------------------------------------------------+
| COST OF A STALLED DEAL (Ledger panel)                                        |
|  [sliders: deals, ACV, weeks stuck]   |  Revenue delayed this year EUR x     |
|                                       |  Cut review to N weeks: EUR y back   |
|  Estimate based on your inputs. Illustrative only.                           |
+------------------------------------------------------------------------------+
| WORKS WITH YOUR TRUST CENTRE                                                 |
|        Vanta proves you have controls. We prove they held.                   |
|   Your agent --> Shoirly --> Vanta / trust centre --> Bank risk team         |
+------------------------------------------------------------------------------+
| FOR VENDORS                        |  FOR BANKS                              |
|  Close bank deals faster           |  Evidence you can verify yourself       |
|  3 short points, link              |  3 short points, link                   |
+------------------------------------------------------------------------------+
| Final CTA: Show a bank what your agent did.          [Book a demo]           |
+------------------------------------------------------------------------------+
| Footer: wordmark, 4 columns, hello@shoirly.com, Made in Dublin, legal        |
+------------------------------------------------------------------------------+
```

Mobile (390px): the hero stacks copy above the trail, and the trail shows its 3 most recent rows. The problem ledger becomes stacked definition blocks. In how it works, the visual stops sticking and sits inline above each step. The calculator stacks with the result under the sliders. The vendor and bank split stacks.

## Review against CLAUDE.md "avoid" list (before code)

| Avoid | First draft | Revision |
|---|---|---|
| All-caps eyebrow labels above every heading | The wireframe had PROBLEM, HOW IT WORKS and similar labels as section tags | Those are wireframe annotations only. No eyebrows ship. Headings stand alone. |
| One highlighted word in a headline | I'd considered colouring "held" in the Vanta line in Seal | Dropped. The whole line is Ink. Emphasis comes from size and placement. |
| Identical rounded cards with the same grey shadow | Vendor and bank columns were drawn as two cards | Revised to two open columns split by a single vertical Rule, with no card boxes. Shadow is reserved for the two paper objects. |
| Gradient blobs as decoration | None planned | Kept none. The hero background is plain Paper with a faint ledger grid at 4% only behind the trail panel. |
| `A · B · C` meta strings | The pack header had "Customer #4471 · Sep 2026 · 1,284 actions" | Revised to a small labelled key/value grid, which is how a real record would show it. |
| `→` on every link | The draft had arrows on every "Learn more" link | Arrows only on the secondary hero link, as a down-arrow that signals a scroll jump. Text links are underlined instead. |
| 01/02/03 markers unless a real sequence | How it works uses 01 to 04 | Kept, because it's a real sequence. Nowhere else uses numbers. |
| Purple-to-blue washes | Seal green on Paper | Fine. |
| Fade-up on every section | The draft had whileInView on all sections | Revised: no generic section fade. Motion only in the hero, the how-it-works step change, calculator figures and the trust-centre flow line drawing once. |
| Hover wobble on every card | None | Hover is a colour/border change only. The magnetic pull is on the one hero CTA. |

Extra checks from the taste skill:

- I was going to add a logo wall under the hero. Removed it on honesty grounds, since there are no customers to show. The problem section moves up into that slot.
- The draft had a 3-column feature grid for "what you get". Removed, because the evidence pack preview shows it directly instead.
- Duplicate CTA intent: the only conversion label is "Book a demo" (nav, hero, final CTA, footer). The secondary is "See how it works", which scrolls the page.

## Decisions log

- Light theme only for v0. CLAUDE.md asks for "light, trustworthy enterprise", and a dark mode would double the visual QA before the judging. The taste skill's dark-mode default is overridden by the brief.
- Icons: Phosphor (`@phosphor-icons/react`), one family, regular weight. Allowed by the taste skill and has the seal, signature and certificate glyphs.
- No stock photography and no image generation. The product's visuals are its evidence records, rendered as real working components rather than screenshots. Team photos on /about are placeholders marked `TODO(team)`, because inventing faces would break the honesty rules.
- No customer logos, counts, testimonials, certification badges or uptime anywhere. Trust comes from showing the evidence format and how verification works.
- Only "motion" for animation. No GSAP and no WebGL, so react-bits components that need them were rejected.
- The hero trail uses invented but plausible sample actions and customer numbers, labelled "Sample data" in the panel so nobody reads it as a live customer.

## Build decisions (2 Oct 2026)

- Next.js 16.3 (App Router, Turbopack), Tailwind v4 with tokens in `@theme` in `globals.css`, `motion` 14, `@next/mdx`. These were the current versions from `create-next-app@latest`.
- Fonts load through `next/font/google`, so nothing is fetched at runtime. A static semibold cut of Schibsted Grotesk sits in `src/assets/fonts` (OFL licence included) only for the favicon and Open Graph image routes, because `next/og` can't use variable fonts.
- Wordmark: lowercase "shoirly" with the tittle of the i drawn as a small Seal-green square, read as a stamp on a record. The favicon is the "s" on Ink with the same square. On Ink the square uses a lighter green (`#2fb37f`) because Seal disappears on a dark ground. That tint appears only in the icon.
- Booking: every "Book a demo" button goes to `/demo`. The button on `/demo` uses `site.bookingUrl`, a mailto for now. When the Cal.com link exists, change one line in `src/config/site.ts`.
- Blog metadata lives in a typed registry (`src/content/blog/index.ts`) instead of MDX frontmatter, so drafts can be filtered without loading posts and typos fail the build. Drafts render at their URL with a visible "Draft" banner and `noindex`, and stay out of the listing and the sitemap.
- With no published posts, the blog listing shows an empty state that points to the DORA guide, rather than an empty list.
- Privacy and terms pages are `noindex` and carry a visible "draft, not in force" banner.
- The hero server-renders the finished state (pack compiled). No-JS visitors, crawlers and reduced-motion users get the whole story in one frame. With motion on, it holds that frame briefly, then replays from the start. The loop pauses off-screen and has a Pause button.
- I dropped BlurText on the hero headline. Animating the largest text on the page delays LCP, and the brief wants one hero moment, which is the trail.
- The "How it works" visual is sticky on desktop and inline above each step on mobile, where sticky panels feel cramped.
- The DORA guide includes Article and FAQPage structured data for search. Each FAQ answer has a plain-text version for the JSON-LD.
- The `/solutions/banks` page has a copyable "evidence request" template. It gives a bank's risk team something to do, and it pulls vendors towards us.
- Inner pages use one consistent left-aligned header (title, lead, optional CTA) so the site reads as one system. The home page is the only place with a split hero.
- Responsive grids always declare a single shrinkable column (`grid-cols-1`) below their breakpoint. Without it, long mono strings pushed mobile layouts sideways.
- Work happens on a `v0-site` branch rather than straight on `main`, so the first review can happen in a pull request.

## Review pass: five weakest things on the home page versus research/

Compared at 1440px and 390px against the Secureframe and Sprinto captures.

1. **The hero headline ran to four lines** and overpowered the trail. Both references keep it to two or three. Capped the size at 56px and widened the measure to three lines.
2. **"How it works" had about 2,000px of dead space** on desktop, and inactive steps were faded to look disabled. Step height went from 64vh to 46vh, inactive steps now use Graphite (still readable at 6.9:1), and the visual sits level with the first step.
3. **The calculator's results sat under the sliders**, off-screen while dragging at 1440px, next to an empty left column. Now it's one panel with sliders left and results right on desktop, and stacked on mobile.
4. **The hero's pack slot was an empty dashed box** for most of the loop. It's now a faded outline of the pack ("Waiting for 100%") that turns solid and verified at full coverage. I also found that rows were anchored to the bottom, so each loop opened with one row under a large empty grid. Rows now fill from the top and scroll once the panel is full.
5. **The trust-centre flow was four generic boxes.** The connectors now say what passes along them (actions, signed packs, shared evidence), so the diagram explains something.

Smaller fixes from the same pass: mobile overflow in the "Connect your agent" preview, uneven coverage labels on mobile, DORA article refs breaking mid-range, wide tabular commas in the calculator figures (now in Plex Mono), the social card's tittle position, and the hero pack's tags overflowing on phones.

## Positioning update (2 Oct 2026)

CLAUDE.md now carries the sharper positioning: EU financial services (banks lead, plus payment firms and insurers), verifiable evidence rather than logs, where we sit against certifications, guardrails and trust centres, deployment where the agent runs, the roadmap, and design-partner stage. Calls made while applying it:

- The "what they get today" table moved to one shared source (`src/content/evidenceToday.ts`), so the home page and /solutions/banks always match. It gained the two new rows: contracts and service reviews, and AI agent certifications such as AIUC-1.
- New home section "Your data never leaves. Only the proof does." sits after the evidence preview, as a boundary diagram (what stays, what leaves). It says only what the brief says leaves: signatures, hashes and coverage counts. It doesn't claim the evidence pack is built from those alone, because the pack shows readable records.
- /security's earlier "we store / we don't store" lists were my guesses. They're replaced by the brief's deployment model: "Stays where your agent runs" and "Leaves". A new "Our hosted service" row covers what Shoirly itself holds.
- The roadmap appears only on /security, under "What we're building next", with a "Not yet available" tag on each item.
- Every "proves nothing went unrecorded" became "shows whether anything went unrecorded". The 404 joke changed too, because it implied an agent's actions never go unrecorded.
- Copy that said banks can check evidence themselves now says they'll be able to once the verification guide is published. That covers the product page, the banks page, the security page, the home evidence preview and the audience split.
- "Plugs into Vanta" became "packs you can share through Vanta or your trust centre" everywhere, and the old TODO about naming integrations was removed.
- Product page: "Not a decision-maker" became "Not a guardrail", using the brief's line "Guardrail tools block actions. We prove them."
- Vendor FAQ gained "We already log everything" and an AIUC-1 question, because those are the two objections the new positioning answers.
- The stage line sits under the CTAs on the home hero and /solutions/agent-vendors, and as the first row of "Where we are today" on /security. On the home hero this deliberately breaks the taste skill's "no line under the CTAs" rule, because the brief asks for it there.
- Metadata: a shared `pageMetadata()` helper sets the canonical and og:url together on https://shoirly.com. While checking, I found subpages had no og:image, because a page-level openGraph replaces the root social card. The helper now attaches the card and the Twitter image explicitly.
- Nav and footer labels: "For banks, payment firms and insurers" in the Solutions menu (widened to fit), and "For financial firms" in the footer, where space is tight. The /solutions/banks URL is unchanged.
- Fixed a dropdown quirk found in testing: hovering opened Solutions, and a click straight after closed it again.

## Multi-phase brief (2 Oct 2026, later)

### Phase 0 and 1
- The screenshot rule now refers to phases. Most of the positioning work had landed in the previous commit. The one change this brief adds is "designed to run where the agent runs" instead of "runs", applied to CLAUDE.md, the home deployment section and /security (last edit to /security before it goes off-limits). CLAUDE.md now says to keep "designed to" until deployments are live.
- From Phase 2 on I don't touch blog files, /security, /privacy, /terms, the 404, /dora, /about, `src/lib/metadata.ts`, `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`, `sitemap.ts` or `robots.ts`.

### Phase 2: hero animation
- Pacing went from about 1.9s to about 3.2s per action (arrive 0.8s, authoriser lands 0.95s, signing 0.7s, signed 0.8s), so each action is readable. A full loop is about 22s, which is acceptable because the server-rendered first frame already shows the whole story.
- The coverage meter now fills steadily (signed out of five). Before, it was signed out of visible, so it dropped each time a new action arrived, which read as a glitch. The percentage and count animate with the same spring as the calculator.
- "Satisfying moments" are each single, non-looping, transform or opacity only: the authoriser slides in with a seal-wash highlight that fades; the signature resolves at 62ms per character, then the check mark stamps in (spring, slight rotation) with a single expanding ring; the chain node fills with the same ring; and the chain segment back to the previous record draws downward.
- The pack resolves in two beats: a one-pass sheen across the outline while "Compiling", then the solid card settles, the "Verified" badge stamps in and the DORA tags follow in sequence.
- Clean loops: the body fades out, then remounts empty under a new cycle key, so rows never visibly unwind or scroll back.
- Pauses when less than 35% is in view, when the tab is hidden (Page Visibility via `useSyncExternalStore`), or with the Pause button (now a 44px target). Under reduced motion, the static finished frame shows and the Pause button is hidden.
- Mount animations only run from cycle 1 onwards, so the server HTML (cycle 0) is the finished, fully visible frame.
- A header status ("Recording", "Checking coverage", "Pack ready") narrates the state. It's text, not a decorative dot.

### Phase 3: how it works and /product
- One `ScrollStory` component powers both home ("How it works") and /product ("Four stages, one record"), so the two never drift apart.
- The sticky scene follows one sample action, the €240 refund, through every stage: capture, authorise and sign, coverage check, pack. It reads as one record evolving rather than four unrelated cards. Scene entrances are one-shot CSS keyframes, motion-safe only, that replay when a scene remounts.
- Scroll-driven: a rail beside the steps fills with `useScroll` progress, step markers fill as they're reached, and a four-segment bar above the sticky scene shows position. Under reduced motion, the rail is static and full and scene swaps are instant.
- Mobile: a stacked sequence where each step carries its own static scene (animations disabled), on the same rail.
- The brief now names the Shoirly proxy as the integration point, so it's recorded in CLAUDE.md and the copy says it plainly. SDK languages and frameworks remain a TODO.
- /product architecture diagram: an environment boundary containing the request path (agent, proxy, tool) and the evidence pipeline (authoriser link, signature, chain, coverage check), with the evidence pack outside it and the crossing labelled "Only proof leaves". Nodes are 48px toggle buttons, and the explanation panel is a polite live region. It defaults to the proxy, the part people ask about first.
- The diagram's pack text says only proof leaves and that this proof makes the pack verifiable. It doesn't say how readable records reach the bank; that's flagged TODO(team).
- /product pack card uses "Example Bank", labelled "Illustrative customer" with an "Illustrative data" tag, so nobody reads it as a real customer.
- Removed the superseded `HowItWorks`, `StepVisuals` and `PipelineDiagram` components.

### Phase 4: calculator
- One component, `src/components/calculator/StalledDealCalculator.tsx`, with `full` (home) and `compact` (/solutions/agent-vendors) variants. Compact puts the sliders in a 2x2 grid with results underneath.
- Sliders stay native `<input type="range">`, for free keyboard support (arrows, Page Up/Down, Home/End) and screen-reader semantics. They feel tactile through CSS: a 44px tall hit area, a 6px track, and a thumb that grows with a seal halo on hover, grows further while dragging, and gets a double ring on keyboard focus. A small scale "pop" on the value confirms each change, and is skipped under reduced motion.
- Before/after review time is two bars on the same 40-week scale, with no background track, as the taste skill asks. The "Today" bar is neutral and the "With evidence" bar is Seal.
- The screen-reader live region updates 700ms after input settles, rather than on every step of a drag. Each slider keeps its `aria-valuetext`.
- The assumption is now one line ("Estimate only..."), with "Book a demo" beside it on desktop and under it on mobile.
- On the vendor page, the FAQ moved to the Ledger tone so the new calculator section and the FAQ don't sit as two consecutive Paper sections.

### Phase 5: motion pass
- One orchestrated moment per page I'm allowed to edit:
  - Home: the hero trail.
  - /product: the architecture diagram's single signal run, where nodes light in order once and the proof line draws across the boundary.
  - /solutions/agent-vendors: a seal rule draws across each review stage in order, questionnaire to oversight.
  - /solutions/banks: the three verification checks run and resolve one after another.
  - /demo: the agenda rules draw as the page opens.
- Other sections stay still. There's no generic fade-up anywhere.
- `useRevealOnce` makes moments safe. The server renders the finished state, a moment only "arms" after hydration if the element is off-screen and motion is allowed, and content already on screen never replays.
- react-bits: adapted StatusMark (trimmed to pending, running and done; recoloured) for the banks checks, because "checking, then verified" is exactly what it animates. Nothing else new was taken. The existing Magnet, DecryptedText, CountUp and SpotlightCard adaptations stay where they were.
- Page transitions: `src/app/template.tsx` fades each new route in on client navigation (opacity only, 280ms). It skips the first load so first paint and LCP aren't delayed, and is instant under reduced motion. It wraps every route, including the ones other agents own, without editing their files.
- Header: transparent border at the top of the page. After 8px of scroll (via Motion's `useScroll`, not a scroll listener) it gains a Rule border, a soft shadow and a backdrop blur. It doesn't shrink, because a height change would shift layout.
- Desktop nav: a hover pill slides between items (shared `layoutId`), and a seal underline marks the current section and slides when the route changes. The header sits in `MotionConfig reducedMotion="user"`, so both snap instead of slide under reduced motion.
- Smooth in-page scrolling stays the CSS `scroll-behavior: smooth` set under `prefers-reduced-motion: no-preference`, with `scroll-padding-top` clearing the sticky header.
- Measured layout shift while scrolling every page I edited: 0.0000 on all five.

### Phase 6: responsive pass (one round)
- One round of screenshots (home, /product, both solutions pages, at 390px and 1440px) plus a tap-target measurement. No page overflowed sideways.
- Tap targets: medium buttons are 44px below `lg` (40px from `lg` up, where input is a pointer). Also raised to 44px on phones: menu toggle, logo link, skip link, audience links, footer links and email, the mobile menu's email link, and the banks "Copy" button. Links inside running text are exempt, as WCAG 2.5.8 allows. Re-measured afterwards: none under 44px on the four pages.
- Hero trail on phones: "Coverage check passed" shortens to "Check passed" and "actions" drops out of the count under 420px. The pack subtitle loses its signature count on phones, so the DORA tags no longer crowd the card's edge.
- Story scenes: the label column narrows to 5.5rem on phones, so action and time values stop truncating.
- Story step markers now sit level with each step title rather than the middle of the block.
- Pack card: stat values never wrap ("1,284 of 1,284" stayed broken across lines on phones).
- Calculator labels shortened to "Annual contract value" and "Weeks in security review", so they fit beside their values on phones.
- Banks request template: removed hard line breaks mid-sentence, so it wraps naturally on phones and in email clients.
- Architecture diagram: a wider boundary-crossing column, so "Only proof leaves" doesn't squeeze.

## Real logo (2 Oct 2026)

- The logo files moved from `/shoirly-logo` to `public/brand/` unchanged (including their C2PA content credentials metadata). The README moved with them as the usage reference.
- `Logo.tsx` now renders `logo.svg` through `next/image` (unoptimized SVG, fixed dimensions, so no layout shift), with a `tone="dark"` option for `logo-white.svg`. No surface on the site is dark yet, so the white version is wired up but unused. The footer uses the wordmark at 48px. The old typographic wordmark is gone.
- **Overruling the logo README in the header:** the README says to use the mark alone below about 48px tall. The header shows the full wordmark at 36px (about 116px wide), because a mark-only header loses the company name and a 48px wordmark would crowd a 64px header, especially on phones. At 36px the seal still renders at roughly two thirds of the logo's height. Revisit if the team prefers mark plus text, or a taller header.
- Favicon set rendered from `mark.svg` in the browser at each exact size: `favicon.ico` (16, 32, 48), `icon.svg` (modern browsers), a 180px apple touch icon on white (iOS fills transparency with black), and 192 and 512px manifest icons with a new `manifest.ts`. The old font-drawn `icon.tsx` and `apple-icon.tsx` were removed.
- The default OG image now uses `logo.svg` at 72px tall, with the headline in Bricolage and the subline in Schibsted, from static font cuts in `src/assets/fonts` (OFL licences included).
- **Accent switched from green `#0A7350` to the logo's Seal blue `#3157F0`.** The logo's "o" is the brand's verification seal, in blue, so green "verified" ticks beside it meant two verification colours. Contrast: 5.5:1 on Paper, 5.0:1 on Ledger, 5.6:1 for white text on blue. Seal-deep `#2443C7` (7.6:1 on Paper) carries accent text, and Seal-wash `#E8EDFE` is the tint. The CLAUDE.md warning about "purple-to-blue gradient washes" isn't triggered, because this is one flat blue with no gradients.
- **Ink switched to the logo's `#0F1B17`** (from `#0D1B1E`, a near-identical green-black). Shadows and the hero's ledger grid were retinted to match. The green-grey neutrals (Paper, Ledger, Rule, Graphite) stay, because they sit naturally with this ink.
- **Headings switched to Bricolage Grotesque** (weight 650, optical sizing on), because Schibsted headings directly under a Bricolage wordmark read as two competing grotesques. Body stays Schibsted Grotesk and data stays IBM Plex Mono.
- The favicon and OG files were previously off-limits to me because other agents own metadata. They changed only because the logo brief asked for it. Metadata text, sitemap and robots weren't touched.

## Merging Hoplite's work (3 Oct 2026)

- Hoplite's legal-drafts merge (`9295e13`: privacy, terms, 404) fast-forwarded cleanly onto my logo commit and builds. Its privacy draft also removed an unverified claim of mine ("does not set advertising cookies"), which is an improvement.
- Hoplite's SEO branch (`hoplite/morgantina-f124b23c--seo`) couldn't merge as-is. It was branched before the logo work, so it deleted the logo-based `opengraph-image.tsx`, drew "shoirly" as plain text on its social cards, imported a font helper (`loadBrandFont`) that the logo commit had replaced, and conflicted with the legal merge's metadata in privacy and terms. I merged it with a merge commit, so it's revertable with `git revert -m 1`. I kept its design (`pageSeo` as the single source of titles and descriptions, a social image per page at `/og/...`, Organisation schema, and a sitemap built from `pageSeo`) and resolved the clashes: privacy and terms use `pageSeo`, with the legal merge's newer descriptions carried into it, and the per-page social image now uses the real logo and the Bricolage/Schibsted fonts.

## Demo booking fix (3 Oct 2026)

- On the live /demo page, the button was a correct mailto link, with nothing covering it and no script errors. It "did nothing" because mailto links fail silently on devices with no email app set up, which is common on Windows and in browsers without a mail handler.
- The button still opens the visitor's email app, now with a prefilled subject and a short message (company, name and role, a couple of times). Right under it, always visible: open the same message in Gmail or Outlook on the web (new tab), or copy `hello@shoirly.com`. After a click, a polite live hint says to use those options if nothing opened.
- The prefilled message lives in `site.demoRequest` in `src/config/site.ts`, so every email booking link uses the same text. When the Cal.com link replaces the mailto (`bookingIsMailto: false`), the card falls back to a single "Book a demo" button.

## More alive, more modern (3 Oct 2026)

Requested by the founders, overriding the brief's earlier "one orchestrated moment per page" restraint. CLAUDE.md is updated to match. I ran the `find-animation-opportunities` audit first, then applied `apple-design` for layering.

- **Page transitions:** React `<ViewTransition>` in `src/app/template.tsx` drives the browser View Transitions API on every route change. The old page recedes (lifts 24px, scales to 0.975, blurs and fades, 380ms). The new page rises (from 56px below with a blur that clears, 640ms on `--ease-out`, starting 120ms later). The header carries `view-transition-name: site-header` and stays anchored, and the footer and background cross-fade. Clicks pass through during the animation. Reduced motion gets a 160ms cross-fade. Browsers without the API fall back to the earlier opacity fade. Neither runs on first load.
- **Route sweep and reading progress:** a seal-blue line sweeps across the header's bottom edge on each navigation, and a 2px reading-progress line rides the same edge (scroll-linked, no listener).
- **Header material:** lighter translucency with a stronger blur and saturation once scrolled, per Apple's "translucent chrome, content scrolls underneath".
- **Hero, ShapeGrid:** adapted from react-bits as `LedgerGrid`. A canvas grid drifts slowly, cells under the pointer light up seal-blue and fade, and an occasional cell lights on its own on the panel's side. It's masked to sit behind the panel, not the headline, so readability is untouched. It's DPR-aware, draws grid lines as strokes rather than per cell, runs only while on screen with the tab visible, and draws one static frame under reduced motion.
- **Hero, layered depth:** `HeroStage` stacks three layers, each moving a different amount: an evidence sheet behind (turned 2.5°), the live trail panel (tilting ±5° toward the pointer on a critically damped spring), and the logo seal in front of the pack corner (desktop only). The layers separate slightly on scroll. Tilt runs only for fine, hover-capable pointers. The seal is the unmodified `mark.svg` (no shadow, rotation or recolour, per the logo README).
- **Headings:** `main section h2` reveal with a pure-CSS scroll-driven animation (`animation-timeline: view()`). It's progressive enhancement: no JavaScript, absent where unsupported or under reduced motion. Being global CSS, it also applies to the pages other agents own, for consistency, without touching their files.
- **FAQ accordions:** open and close smoothly via `::details-content` and `interpolate-size: allow-keywords`, instantly where unsupported.
- **Press feedback:** buttons, architecture-diagram nodes, the evidence-preview notes and FAQ rows scale down slightly while pressed (100 to 150ms). Primary buttons get a single light sweep on hover.
- **Deployment section:** three pulses flow from "your environment" to "Only this leaves", making "only proof leaves" literal. Pure CSS, hidden under reduced motion.
- **Rejected in the audit:** animating calculator figures or ledger rows further (people are reading that data), changing the nav hover pill (high frequency, already fast), custom cursors or trails, and full-page moving backgrounds.

## Smoother and quicker motion (3 Oct 2026)

Feedback: animations felt very slow, and page transitions choppy and clunky. Measured on the live site first, then fixed.

- **Page transitions:** I had been animating a blur filter on full-page snapshots, which can't stay on the compositor, plus about 0.8s of back-to-back exit and entry. Now it's transform and opacity only, with overlapping halves: the old page fades and lifts 10px in 170ms, and the new page rises 18px in 340ms starting 50ms in. The root cross-fade is 220ms. Measured: about 450ms in total (down from 810–840ms). Leaving home dropped from 6 janky frames with three ~56ms main-thread stalls to 1 janky frame and none.
- **Hero grid:** the drift used to redraw the whole canvas on the main thread every frame. The grid lines are now a CSS background on a layer the compositor slides one cell and loops seamlessly. The canvas rides on that layer and only redraws while a cell is lit or fading. Measured idle on home: 60fps, 0 janky frames, 0 long animation frames.
- **Heading reveals:** opacity and transform only (the clip-path is gone), finishing as the heading fully enters rather than a third of the way up the screen.
- **Hero trail pacing:** about 2.3s per action (was about 3.2s), with snappier row entry, signature resolve (45ms per character), list scroll, coverage fill and pack settle. A loop is now about 16s.
- **Springs:** the panel tilt and animated numbers are stiffer, still critically damped (no bounce), so they track quicker.
- **Scene swaps:** "How it works" scenes cross-fade together (the old one leaves in 160ms while the new one arrives in 260ms) instead of waiting for the exit to finish first.
- **Other timings:** accordion 240ms, header route sweep 450ms, scene stagger delays about a third shorter, the diagram's signal run 170ms per node, and the vendor-stage rules and bank checks paced tighter.
