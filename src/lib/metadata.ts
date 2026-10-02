import type { Metadata } from "next";
import { site } from "@/config/site";

const DEFAULT_TITLE = "Shoirly: signed proof of what your AI agent did";

type PageMetaInput = {
  /** Page title without the brand suffix. Omit for the home page. */
  title?: string;
  description: string;
  /** Path on the canonical host, starting with "/". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
};

export const pageSeo: Record<string, PageMetaInput> = {
  "/": { description: site.description, path: "/" },
  "/product": {
    title: "Product: how Shoirly works",
    description: "Capture each agent action, sign it with who authorised it, check coverage, and share a per-customer evidence pack mapped to the controls your buyers check.",
    path: "/product",
  },
  "/solutions/agent-vendors": {
    title: "For AI agent companies: close deals with regulated buyers",
    description: "Security reviews with regulated buyers stall on one question: what did your agent actually do? Answer it with signed, per-customer evidence, starting with DORA for EU financial services.",
    path: "/solutions/agent-vendors",
  },
  "/solutions/banks": {
    title: "For banks, payment firms and insurers: evidence of what your vendor's AI agent did",
    description: "What risk, procurement and third-party oversight teams at banks, payment firms and insurers receive from vendors using Shoirly, and how to ask for it.",
    path: "/solutions/banks",
  },
  "/dora": {
    title: "DORA explained for AI agent vendors selling to banks",
    description: "A plain-English guide to the EU Digital Operational Resilience Act (DORA): what it asks of banks, insurers and payment firms, what that means for AI agent vendors, and the evidence that helps.",
    path: "/dora",
    type: "article",
  },
  "/security": {
    title: "Security: how evidence is signed, where Shoirly runs, what leaves",
    description: "How Shoirly signs and chains evidence records, why it is designed to run where your agent runs, and why only signatures, hashes and coverage counts ever leave.",
    path: "/security",
  },
  "/about": {
    title: "About",
    description: "Shoirly is a four-person team in Dublin building signed evidence for AI agents that act for regulated businesses.",
    path: "/about",
  },
  "/blog": {
    title: "Blog",
    description: "Writing on AI agents, security reviews and the rules regulated buyers work under, from the Shoirly team.",
    path: "/blog",
  },
  "/demo": {
    title: "Book a demo",
    description: "See a sample evidence pack and how Shoirly fits into your buyer's security review. Thirty minutes with the founding team.",
    path: "/demo",
  },
  "/privacy": {
    title: "Privacy (draft)",
    description: "Placeholder privacy notice for Shoirly, based in Dublin, Ireland. Draft pending legal review.",
    path: "/privacy",
    noindex: true,
  },
  "/terms": {
    title: "Terms (draft)",
    description: "Placeholder website terms for Shoirly, based in Dublin, Ireland. Draft pending legal review.",
    path: "/terms",
    noindex: true,
  },
  "/404": {
    title: "Page not found",
    description: "We could not find this page. Explore Shoirly's signed evidence for AI agents or book a demo with the team.",
    path: "/404",
    noindex: true,
  },
};

export const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organisation`,
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
  ...(site.social.linkedin ? { sameAs: [site.social.linkedin] } : {}),
};

/**
 * Builds page metadata so the canonical URL and og:url always match, on the
 * canonical host (https://shoirly.com). Page-level openGraph replaces the
 * layout's, so the shared fields are repeated here.
 */
export function pageMetadata({ title, description, path, type = "website", publishedTime, noindex }: PageMetaInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  const socialTitle = title ? `${title} | ${site.name}` : DEFAULT_TITLE;
  const ogImage = {
    url: `${site.url}/og${path === "/" ? "/home" : path}`,
    width: 1200,
    height: 630,
    alt: socialTitle,
  };
  return {
    ...(title ? { title } : {}),
    description,
    ...(path !== "/404" ? { alternates: { canonical: url } } : {}),
    openGraph: {
      type,
      url,
      siteName: site.name,
      locale: "en_IE",
      title: socialTitle,
      description,
      images: [ogImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [ogImage] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
