/**
 * Sample data for product illustrations. Every surface that renders this labels
 * it "Sample data". None of it describes a real customer, person or company.
 */

export type SampleAction = {
  id: string;
  time: string;
  action: string;
  approver: string;
  approverKind: "policy" | "person";
  signature: string;
};

export const sampleActions: SampleAction[] = [
  {
    id: "a1",
    time: "09:41:07",
    action: "Refund €240 to customer #4471",
    approver: "Refunds policy v3, under €500",
    approverKind: "policy",
    signature: "9f3a71c0e2b4",
  },
  {
    id: "a2",
    time: "09:41:12",
    action: "Read account history, customer #4471",
    approver: "Case owner R. Kavanagh",
    approverKind: "person",
    signature: "4be20d9a17f6",
  },
  {
    id: "a3",
    time: "09:42:30",
    action: "Upgrade account to Business plan",
    approver: "Account manager S. Okafor",
    approverKind: "person",
    signature: "c71e58b3a0d2",
  },
  {
    id: "a4",
    time: "09:42:31",
    action: "Send renewal notice by email",
    approver: "Customer comms policy v7",
    approverKind: "policy",
    signature: "08d4f2e96c1b",
  },
  {
    id: "a5",
    time: "09:43:02",
    action: "Escalate case #88213 for review",
    approver: "Escalation rules v12",
    approverKind: "policy",
    signature: "e5a9037bd84c",
  },
];

/**
 * Framework-neutral control areas the sample pack is tagged with. Where a
 * specific framework is shown, DORA is the example (see EvidencePreview and
 * PackCard). Indicative only.
 * TODO(team): have the DORA references reviewed by someone qualified before launch.
 */
export const samplePackControls = ["Third-party oversight", "Access and authorisation", "Incident response"];
