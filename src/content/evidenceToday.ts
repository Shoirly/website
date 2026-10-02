/**
 * What a financial institution's risk team relies on today, and what each
 * source misses. Shared by the home page and /solutions/banks so the two
 * always say the same thing.
 */
export const evidenceToday = [
  {
    what: "Certificates",
    example: "SOC 2, ISO 27001",
    shows: "You have controls, as of the audit period.",
    misses: "Whether they held for this bank's customers last Tuesday.",
  },
  {
    what: "AI agent certifications",
    example: "e.g. AIUC-1",
    shows: "The agent passed tests this quarter.",
    misses: "What it did for this bank's customers.",
  },
  {
    what: "Contracts and periodic service reviews",
    example: "Clauses, SLA reports",
    shows: "Agreed obligations and SLA performance.",
    misses: "What the system did on a given day, for a given action.",
  },
  {
    what: "Questionnaires",
    example: "Vendor due diligence, DDQs",
    shows: "What you say your system does.",
    misses: "What it actually did, action by action.",
  },
  {
    what: "Gateway and app logs",
    example: "API logs, traces",
    shows: "That calls happened.",
    misses: "Who authorised them, and whether any went unrecorded.",
  },
];
