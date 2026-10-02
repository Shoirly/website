/**
 * The one place for contact details, links and navigation.
 * Nothing else in the codebase should hardcode an email, URL or nav item.
 */

const email = "hello@shoirly.com";

export const site = {
  name: "Shoirly",
  url: "https://shoirly.com",
  description:
    "Signed, per-customer evidence of what your AI agent did and who approved it, mapped to DORA, so security reviews at banks, insurers and payment firms stop stalling your deals.",
  email,
  location: "Dublin, Ireland",

  // TODO(team): swap for the Cal.com booking link once it exists.
  // Every "Book a demo" button reads from here.
  bookingUrl: `mailto:${email}?subject=${encodeURIComponent("Shoirly demo request")}`,
  bookingIsMailto: true,

  social: {
    // TODO(team): add the real company LinkedIn URL, or remove the entry.
    linkedin: "",
  },

  nav: [
    { label: "Product", href: "/product" },
    {
      label: "Solutions",
      children: [
        {
          label: "For agent vendors",
          href: "/solutions/agent-vendors",
          description: "Get through security review with financial institutions",
        },
        {
          label: "For banks, payment firms and insurers",
          href: "/solutions/banks",
          description: "What your risk team receives, and how to ask for it",
        },
      ],
    },
    { label: "DORA", href: "/dora" },
    { label: "Security", href: "/security" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],

  footer: [
    {
      heading: "Product",
      links: [
        { label: "How it works", href: "/product" },
        { label: "Security", href: "/security" },
        { label: "Book a demo", href: "/demo" },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "For agent vendors", href: "/solutions/agent-vendors" },
        { label: "For financial firms", href: "/solutions/banks" },
        { label: "DORA explained", href: "/dora" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
