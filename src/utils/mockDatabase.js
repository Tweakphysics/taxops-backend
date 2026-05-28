// Simulated PostgreSQL + Supabase Database Layer for GST + ITR Platform

export const initialClients = [
  {
    id: "cli_rohan_tech",
    pan: "ABCDE1234F",
    legalName: "Rohan Tech Services",
    gstin: "27ABCDE1234F1Z1",
    state: "Maharashtra",
    mobile: "+91 98765 43210",
    employeeMobile: "+91 99999 88888",
    activeTemplate: "consultant",
    scheme: "Presumptive Taxation (44ADA)",
    registrationDate: "2024-04-15",
    status: "Active"
  },
  {
    id: "cli_sharma_timber",
    pan: "FGHIJ5678K",
    legalName: "Sharma Timber Mart",
    gstin: "27FGHIJ5678K1Z3",
    state: "Maharashtra",
    mobile: "+91 98888 77777",
    employeeMobile: "",
    activeTemplate: "trader",
    scheme: "Composition Scheme (1%)",
    registrationDate: "2023-08-10",
    status: "Active"
  },
  {
    id: "cli_academy_online",
    pan: "LMNOP9012Q",
    legalName: "Apex Coding Academy",
    gstin: "29LMNOP9012Q1Z5",
    state: "Karnataka",
    mobile: "+91 97777 66666",
    employeeMobile: "+91 96666 55555",
    activeTemplate: "educator",
    scheme: "Regular Scheme",
    registrationDate: "2025-01-20",
    status: "Active"
  }
];

export const initialInvoices = [
  {
    id: "inv_101",
    clientId: "cli_rohan_tech",
    type: "Sales",
    invoiceNo: "RTS/2026/05",
    date: "2026-05-15",
    particulars: "Software Development for TechCorp Inc",
    sacCode: "998314",
    taxableValue: 150000,
    cgst: 13500,
    sgst: 13500,
    igst: 0,
    totalAmount: 177000,
    status: "Verified",
    source: "WhatsApp (Owner)",
    imageUrl: null
  },
  {
    id: "inv_102",
    clientId: "cli_rohan_tech",
    type: "Purchase",
    invoiceNo: "CR/9876",
    date: "2026-05-12",
    particulars: "Infiniti Retail Limited (Croma Monitor)",
    sacCode: "847130", // Capital Goods
    taxableValue: 20000,
    cgst: 1800,
    sgst: 1800,
    igst: 0,
    totalAmount: 23600,
    status: "Verified",
    source: "WhatsApp (Employee)",
    imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "inv_103",
    clientId: "cli_rohan_tech",
    type: "Purchase",
    invoiceNo: "AWS/2026/902",
    date: "2026-05-08",
    particulars: "Amazon Web Services (Cloud Hosting)",
    sacCode: "998315",
    taxableValue: 10000,
    cgst: 900,
    sgst: 900,
    igst: 0,
    totalAmount: 11800,
    status: "Verified",
    source: "WhatsApp (Owner)",
    imageUrl: null
  },
  {
    id: "inv_201",
    clientId: "cli_sharma_timber",
    type: "Sales",
    invoiceNo: "STM/7891",
    date: "2026-05-22",
    particulars: "Teak Wood Batens for Royal Housing",
    hsnCode: "4407",
    taxableValue: 80000,
    cgst: 7200,
    sgst: 7200,
    igst: 0,
    totalAmount: 94400,
    status: "Verified",
    source: "Manual POS Export",
    imageUrl: null
  }
];

export const initialFilings = [
  {
    id: "fil_01",
    clientId: "cli_rohan_tech",
    returnType: "GSTR-1",
    period: "May 2026",
    dueDate: "2026-06-11",
    taxableSales: 150000,
    totalOutputTax: 27000,
    totalInputTax: 3600,
    netTaxDue: 23400,
    status: "Filed",
    arn: "ARN270526001234F",
    cpin: null,
    paymentStatus: "NA",
    filingDate: "2026-05-25"
  },
  {
    id: "fil_02",
    clientId: "cli_rohan_tech",
    returnType: "GSTR-3B",
    period: "May 2026",
    dueDate: "2026-06-20",
    taxableSales: 150000,
    totalOutputTax: 27000,
    totalInputTax: 3600,
    netTaxDue: 23400,
    status: "Draft",
    arn: null,
    cpin: "2605123456789",
    paymentStatus: "Unpaid",
    filingDate: null
  }
];

export const initialNotices = [
  {
    id: "not_01",
    clientId: "cli_rohan_tech",
    noticeType: "ASMT-10 (Scrutiny Notice)",
    discrepancyType: "GSTR-1 vs GSTR-3B Output Mismatch",
    issuedDate: "2026-05-20",
    replyDeadline: "2026-06-04",
    amountDiscrepancy: "₹12,500",
    severity: "Medium",
    status: "Awaiting Action",
    content: "Discrepancy in tax liabilities declared in GSTR-1 and paid in GSTR-3B for the tax period October 2025. Difference detected in Table 4.1 under CGST and SGST ledgers.",
    aiReplyTemplate: "TO,\nThe Superintendent of Central Tax,\nRange-IV, Pune Division.\n\nSUBJECT: Reply to Notice in Form GST ASMT-10 (Ref: October 2025 Mismatch)\n\nRespected Sir,\nIn reference to the discrepancy flagged in Form GST ASMT-10 regarding an output difference of ₹12,500, we respectfully submit that the mismatch arose due to an inadvertent clerical error in Table 4 of GSTR-3B, which has been duly corrected and set-off in subsequent filing of GSTR-1 for November 2025. All net tax liabilities have been fully paid. Hence, we request that the scrutiny proceedings be closed."
  }
];

export const initialTickets = [
  {
    id: "tic_01",
    userId: "usr_ca_priya12",
    userName: "Priya Sharma (Partner CA)",
    pageUrl: "/admin/clients/rohan-tech/gst-filing",
    timestamp: "2026-05-28 13:30",
    audioDuration: "12s",
    transcription: "Hey, I am trying to submit Rohan's GSTR-3B return but the submit button is spinning, and it's throwing a 503 error. Can you check what's wrong?",
    diagnosis: "Sandbox GSP Gateway returned HTTP 503 Service Unavailable due to scheduled Sunday maintenance window by the GSTN portal.",
    solution: "Queued GSTR-3B return to auto-submit once gateway connection recovers at 4:00 PM. Notified developers via ticket #1024.",
    status: "Auto-Queued"
  }
];
