import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = pageMetadata(pageSeo["/privacy"]);

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="2 October 2026">
      <p>
        <strong>Draft pending legal review.</strong> This placeholder outlines the intended approach to personal data
        on the Shoirly website and in early enquiries. It is not a final privacy notice. We need to confirm our actual
        data handling and complete the details below before publishing a reviewed version.
      </p>
      <h2>Who we are</h2>
      <p>
        Shoirly is an early-stage business based in {site.location}. For privacy questions, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        <strong>To be confirmed:</strong> the full legal name, company registration number and registered address of the
        entity responsible for personal data (the data controller).
      </p>
      <h2>Information we may receive</h2>
      <ul>
        <li>
          Enquiries and demo requests: your name, email address, organisation and any information you choose to share
          when contacting us.
        </li>
        <li>
          Technical information: hosting services may process IP addresses, browser details and request logs to
          deliver and protect the website. The exact information collected needs to be confirmed.
        </li>
      </ul>
      <p>Please do not send passwords, sensitive personal information or customer records in a website enquiry.</p>
      <h2>Why we would use it</h2>
      <p>
        The intended purposes are to answer enquiries, arrange demos, discuss design partnerships and keep the website
        working securely. The final notice will identify the lawful basis under the GDPR for each purpose. Depending
        on the activity, this may involve steps requested before a contract, legitimate interests or consent where
        required. These bases still need to be assessed and confirmed.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        <strong>To be confirmed:</strong> an inventory of cookies, similar technologies and any analytics used by this
        website, including those used by service providers. This draft does not claim that the site is cookie-free.
        The reviewed notice will explain what is used, why, how long it lasts and how to manage your choices. Any
        non-essential technologies requiring consent should only be enabled after that consent is obtained.
      </p>
      <h2>Service providers and international transfers</h2>
      <p>
        Running the website and responding to enquiries may involve hosting, email and booking service providers.
        Before finalising this notice, we need to confirm which providers receive personal data, their roles and where
        they process it. Any transfers outside the European Economic Area and the applicable safeguards must also be
        documented. This draft makes no claim that all personal data stays in Ireland or the EU.
      </p>
      <h2>How long information is kept</h2>
      <p>
        Our intended approach is to keep personal data only for as long as needed for the relevant purpose and any
        applicable legal obligations. Retention periods, deletion procedures and the criteria for keeping enquiry
        records and technical logs still need to be confirmed and included in the final notice.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on the circumstances and the lawful basis used, the GDPR gives you rights to access, correct or
        erase your personal data, restrict processing, object to processing and receive certain data in a portable
        format. Where processing relies on consent, you can withdraw it without affecting the lawfulness of earlier
        processing. These rights are subject to legal conditions and exceptions.
      </p>
      <p>
        To make a request, email <a href={`mailto:${site.email}`}>{site.email}</a>. We may need enough information to
        verify your identity before responding. You can also raise a complaint with Ireland&apos;s{" "}
        <a href="https://www.dataprotection.ie/en/individuals">Data Protection Commission</a>.
      </p>
      <h2>Product data</h2>
      <p>
        This draft covers the website and enquiries, not personal data processed within a customer deployment.
        Responsibilities for product data will need to be set out in a separate customer agreement and, where
        appropriate, data processing terms. Product design statements are not a substitute for those agreements.
      </p>
      <h2>Completing this notice</h2>
      <p>
        The controller details, data inventory, lawful bases, providers, transfer safeguards, retention periods and
        cookie information above remain open items for the team and its legal adviser. We will update the date on this
        page when a reviewed notice replaces this draft.
      </p>
    </LegalPage>
  );
}
