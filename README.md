# Shoirly website

Marketing site for Shoirly: signed, per-customer evidence of what an AI agent did and who approved it, mapped to DORA.

- `CLAUDE.md` is the project brief and source of truth.
- `DECISIONS.md` logs design and product decisions, including the token system.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Stack: Next.js (App Router, TypeScript), Tailwind CSS v4, `motion`, MDX.

## Where things live

| What | Where |
|---|---|
| Contact email, booking link, nav, footer | `src/config/site.ts` |
| Logo / wordmark | `src/components/brand/Logo.tsx` |
| Design tokens | `src/app/globals.css` (`@theme`) |
| Sample data used in product illustrations | `src/content/sample.ts` |
| Blog posts | `src/content/blog/` (register each post in `index.ts`) |
| Effects adapted from react-bits | `src/components/fx/` (source credited in each file) |

Search for `TODO(team)` to find details the team still needs to fill in.

## Blog

Add an `.mdx` file to `src/content/blog/` and register it in `src/content/blog/index.ts`. Posts with `draft: true` render at their URL (with a draft banner and `noindex`) but stay out of the listing and the sitemap.
