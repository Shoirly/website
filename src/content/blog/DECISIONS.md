# Blog decisions

- Use the existing palette, typography and shared CTA without editing shared surfaces, respecting the blog-only scope.
- Feature an explicitly marked published post, falling back to the latest; show an honest empty state until there is published content.
- Allow draft review only under `next dev`; exclude drafts from production articles, image routes, index, related posts, RSS and the existing sitemap.
- Estimate reading time from the MDX source at 200 words per minute, excluding editorial comments and markup, to avoid manually maintained counts.
- Keep article styles and MDX overrides local to blog components; constrain text to 65 characters and scroll wide tables and code independently.
- Rank related published posts by shared topic, then publication date; omit the section when no genuine related content exists.
- Use the collective team author until the team confirms attribution, without inventing an individual biography or portrait.
- Serve excerpt-based RSS at `/blog/rss.xml` and generate title-specific 1200 × 630 social cards using the existing brand font.
- Keep decision notes here rather than changing root `DECISIONS.md`, which is outside the user's edit scope.
