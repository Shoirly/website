import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy (draft)",
  description: "Draft privacy notice for the Shoirly website.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

// TODO(team): replace with a privacy notice reviewed by a lawyer before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="2 October 2026">
      <p>
        This is a placeholder. It outlines how we intend to handle personal data on this website, and will be replaced
        by a reviewed notice.
      </p>
      <h2>Who we are</h2>
      <p>
        Shoirly is based in {site.location}. {/* TODO(team): registered company name, number and address. */}You can
        contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2>What this website collects</h2>
      <ul>
        <li>If you email us, we keep your message and contact details to reply and follow up.</li>
        <li>Basic server logs needed to run and secure the site.</li>
        {/* TODO(team): list analytics, if any are added, and the cookies they set. */}
      </ul>
      <p>This website does not set advertising cookies.</p>
      <h2>Your rights</h2>
      <p>
        Under the GDPR you can ask to access, correct or delete personal data we hold about you, and you can complain to
        the Data Protection Commission in Ireland.
      </p>
      <h2>Product data</h2>
      <p>
        How the Shoirly product handles customer data will be covered in our customer agreement and data processing
        terms.
      </p>
    </LegalPage>
  );
}
