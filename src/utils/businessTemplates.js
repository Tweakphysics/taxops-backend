// Dynamic JSON Business Templates for GST + ITR Compliance Operating System

export const businessTemplates = {
  consultant: {
    templateId: "consultant_v1",
    businessType: "Consultant",
    description: "GST & ITR compliance template for service professionals, developers, and freelancers.",
    taxSchemes: ["Regular Scheme", "Composition Scheme (6%)", "Presumptive Taxation (44ADA)"],
    defaultScheme: "Presumptive Taxation (44ADA)",
    billingRules: {
      defaultSacCode: "998314",
      gstRateDefault: 18,
      allowInputTaxCredit: true
    },
    commonItems: [
      { code: "998314", label: "Software Development & IT Consulting", rate: 18 },
      { code: "998313", label: "UX/UI Design & Creative Consulting", rate: 18 },
      { code: "998311", label: "Management & General Business Advisory", rate: 18 }
    ],
    aiPromptConfig: {
      classificationInstruction: "Classify this invoice as standard business expenditure (SaaS subscription, internet, hardware) or personal. Highlight eligible Section 16 Input Tax Credit.",
      taxOptimizationContext: "Emphasize Section 44ADA Presumptive Taxation benefits, allowing a flat 50% deduction without requiring receipt records."
    },
    reminders: [
      { trigger: "GSTR-1", schedule: "Monthly (5th)", message: "Hi {{user_name}}, it's time to log your sales invoices for GSTR-1. Send photos of bills or reply 'None'!" },
      { trigger: "ITR-4", schedule: "Annual (July)", message: "Hey {{user_name}}, let's calculate your annual presumptive profits under 44ADA to minimize your income tax." }
    ]
  },
  trader: {
    templateId: "trader_v1",
    businessType: "Trader",
    description: "GST & ITR compliance template for retail shop owners, distributors, and merchandise traders.",
    taxSchemes: ["Regular Scheme", "Composition Scheme (1%)", "Presumptive Taxation (44AD)"],
    defaultScheme: "Composition Scheme (1%)",
    billingRules: {
      defaultSacCode: "0044", // Goods
      gstRateDefault: 12,
      allowInputTaxCredit: false // Composition default is false
    },
    commonItems: [
      { code: "4407", label: "Timber and Wooden Goods", rate: 18 },
      { code: "6109", label: "Readymade Garments & Apparel", rate: 12 },
      { code: "8517", label: "Mobile Phones & Electronic Gadgets", rate: 18 }
    ],
    aiPromptConfig: {
      classificationInstruction: "Strictly catalog inventory purchases. Ensure CGST+SGST or IGST is split according to supplier location. Cash expenses must be tracked within daily Section 40A(3) thresholds.",
      taxOptimizationContext: "Analyze Composition scheme thresholds (₹1.5 Crore) and Presumptive Section 44AD (flat 8% profit margin)."
    },
    reminders: [
      { trigger: "CMP-08", schedule: "Quarterly (15th)", message: "Hi {{user_name}}, your quarterly Composition return (CMP-08) is due. Send your consolidated sales total." },
      { trigger: "GSTR-1", schedule: "Monthly (11th)", message: "Hey {{user_name}}, please export your POS bill registry and upload here to compile GSTR-1." }
    ]
  },
  educator: {
    templateId: "educator_v1",
    businessType: "Educator",
    description: "GST & ITR compliance template for online instructors, coaching academies, and content creators.",
    taxSchemes: ["Regular Scheme", "Presumptive Taxation (44ADA)", "Exempt Education Services"],
    defaultScheme: "Regular Scheme",
    billingRules: {
      defaultSacCode: "999293",
      gstRateDefault: 18,
      allowInputTaxCredit: true
    },
    commonItems: [
      { code: "999293", label: "Commercial Training & Coaching Services", rate: 18 },
      { code: "999294", label: "Online Course Content Creation & Licensing", rate: 18 }
    ],
    aiPromptConfig: {
      classificationInstruction: "Assess whether course sales are domestic (18% GST) or export (zero-rated with LUT). Expense tracking must capture marketing SaaS and recording equipment.",
      taxOptimizationContext: "Maximize deductions under Section 37(1) for content creation expenses (software, cameras, advertising)."
    },
    reminders: [
      { trigger: "GSTR-1", schedule: "Monthly (5th)", message: "Hey {{user_name}}, GSTR-1 is around the corner. Send photos of your stripe/payment gateway sales sheets." }
    ]
  }
};
