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
    action: "Read KYC file, customer #4471",
    approver: "Case owner R. Kavanagh",
    approverKind: "person",
    signature: "4be20d9a17f6",
  },
  {
    id: "a3",
    time: "09:42:30",
    action: "Update credit limit to €3,000",
    approver: "Credit officer S. Okafor",
    approverKind: "person",
    signature: "c71e58b3a0d2",
  },
  {
    id: "a4",
    time: "09:42:31",
    action: "Send arrears notice by email",
    approver: "Customer comms policy v7",
    approverKind: "policy",
    signature: "08d4f2e96c1b",
  },
  {
    id: "a5",
    time: "09:43:02",
    action: "Flag transaction #88213 for review",
    approver: "Fraud rules v12",
    approverKind: "policy",
    signature: "e5a9037bd84c",
  },
];

/**
 * DORA areas the sample pack is tagged with. Indicative only.
 * TODO(team): have the DORA mapping reviewed by someone qualified before launch.
 */
export const samplePackDora = ["ICT third-party risk", "ICT risk management", "Incident management"];
