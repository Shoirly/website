import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = pageMetadata(pageSeo["/terms"]);

export default function TermsPage() {
  return (
    <LegalPage title="Website terms of use" updated="2 October 2026">
      <p>
        <strong>Draft pending legal review.</strong> These are placeholder website terms, not yet in force. They do not
        create a customer agreement or ask you to accept a binding contract by browsing this site. A reviewed version
        will replace this draft.
      </p>
      <h2>Who we are</h2>
      <p>
        Shoirly is an early-stage business based in {site.location}. You can contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        <strong>To be confirmed:</strong> the operating entity&apos;s full legal name, company registration number and
        registered address.
      </p>
      <h2>What these terms cover</h2>
      <p>
        The intended scope is this public website and its informational content. Product access, trials and design
        partnerships will need separate written agreements covering the agreed scope, fees, responsibilities and any
        data processing. Requesting a demo does not by itself purchase a service or guarantee access to a pilot.
      </p>
      <h2>Information on this site</h2>
      <p>
        Content on this site, including our DORA guide, is general information and not legal advice. Sample evidence,
        names and figures shown on the site are illustrative.
      </p>
      <h2>Our stage and roadmap</h2>
      <p>
        We are early and taking on design partners. Descriptions of planned features, deployment options and
        integrations explain our direction, not a promise that they are available today or will ship on a particular
        date. Any agreed product commitments should be recorded in a separate written agreement. Shoirly evidence is
        not a certification or a guarantee of regulatory compliance.
      </p>
      <h2>Estimates</h2>
      <p>
        The stalled-deal calculator produces estimates from the numbers you enter. It is not a forecast or a promise of
        results.
      </p>
      <h2>Using the website responsibly</h2>
      <p>
        Please use the site lawfully. Do not try to gain unauthorised access, interfere with its operation, introduce
        malicious code or misuse contact channels. Do not submit confidential customer records or sensitive personal
        information in a demo request.
      </p>
      <h2>Content and third-party links</h2>
      <p>
        Website content and branding may be protected by intellectual property rights belonging to Shoirly or their
        respective owners. This draft does not grant a licence to use our branding or imply an endorsement. Contact us
        if you would like permission to reuse material.
      </p>
      <p>
        Links to third-party websites are provided for reference. Those sites have their own terms and privacy
        notices, and their content and availability are outside our control.
      </p>
      <h2>Availability and responsibility</h2>
      <p>
        Website information may change, and pages may be unavailable or contain errors. Please check important
        information with us before relying on it for a business decision. Any warranty wording or limits on liability
        remain to be settled in legal review. Nothing in this draft is intended to exclude rights or responsibilities
        that cannot lawfully be excluded, including applicable consumer rights.
      </p>
      <h2>Privacy</h2>
      <p>
        Our <a href="/privacy">draft privacy notice</a> outlines the intended approach to website and enquiry data,
        together with the details still to be confirmed. It is also pending legal review.
      </p>
      <h2>Irish law and the final version</h2>
      <p>
        As an Irish business, we expect the final website terms to address Irish law and dispute resolution. The
        applicable wording, jurisdiction and any protections required for visitors in other countries need legal
        review. This placeholder does not impose a governing-law or exclusive-court clause.
      </p>
      <p>
        The final version will also confirm the operating entity, permissions for reuse, any liability provisions and
        how changes to the terms take effect. Its publication date will be shown on this page.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
