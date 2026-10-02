import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms (draft)",
  description: "Draft terms of use for the Shoirly website.",
  path: "/terms",
  noindex: true,
});

// TODO(team): replace with terms reviewed by a lawyer before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Website terms of use" updated="2 October 2026">
      <p>
        This is a placeholder for the terms that govern use of this website. Use of the Shoirly product will be covered
        by a separate customer agreement.
      </p>
      <h2>Information on this site</h2>
      <p>
        Content on this site, including our DORA guide, is general information and not legal advice. Sample evidence,
        names and figures shown on the site are illustrative.
      </p>
      <h2>Estimates</h2>
      <p>
        The stalled-deal calculator produces estimates from the numbers you enter. It is not a forecast or a promise of
        results.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
