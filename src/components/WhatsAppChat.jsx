// WhatsApp Conversational Assistant Simulator Component
import React, { useState, useEffect, useRef } from 'react';
import {
  Send, Image, Mic, ChevronRight, Play, AlertTriangle, CheckCheck, Loader2,
  Paperclip, FileText, Volume2, Plus, X, FileUp
} from 'lucide-react';

export default function WhatsAppChat({
  client,
  invoices,
  onAddInvoice,
  filings,
  onUpdateFiling,
  activeTemplate,
  onUpdateClientField
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Welcome back, Rohan! I am your AI Tax Assistant. GSTR-3B for May 2026 is due in 3 days. Your output sales GST is ₹27,000 and eligible Input Tax Credit (ITC) is ₹3,600. Your estimated net tax payment is ₹23,400.`,
      timestamp: "14:15",
      quickReplies: [
        { label: "Prepare Return Draft", action: "prepare_return" },
        { label: "Check Invoice Records", action: "view_ledger" },
        { label: "Optimize Tax Legally", action: "optimize_tax" }
      ]
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addBotMessage = (text, quickReplies = [], delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickReplies
        }
      ]);
    }, delay);
  };

  const handleSendMessage = (text, e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // 2. Simulate AI Processing
    const query = text.toLowerCase();
    if (query.includes('laptop') || query.includes('expense') || query.includes('claim')) {
      addBotMessage(
        "Under Section 16 of the CGST Act, a laptop is classified as a Capital Asset used directly for your business operations. Yes, you can claim 18% Input Tax Credit (ITC) and deduct annual depreciation under Section 32 of the Income Tax Act. Would you like to upload the purchase receipt?",
        [{ label: "Upload Photo Receipt", action: "trigger_photo" }, { label: "Upload PDF Invoice", action: "trigger_pdf" }]
      );
    } else if (query.includes('prepare') || query.includes('file') || query.includes('gstr')) {
      const pendingFiling = filings.find(f => f.returnType === 'GSTR-3B' && f.status === 'Draft');
      if (pendingFiling) {
        addBotMessage(
          "I have compiled your GSTR-3B draft return. Sales: ₹1,50,000 (GST: ₹27,000), Purchases: ₹30,000 (ITC: ₹3,600). Your net cash payment is ₹23,400. To submit, click the option below to send this return for partner CA audit.",
          [{ label: "Submit for CA Audit", action: "submit_ca_audit" }]
        );
      } else {
        addBotMessage("All your returns for this month are successfully filed! Let me know if you want to project next month's tax.");
      }
    } else if (query.includes('opt') || query.includes('save tax')) {
      addBotMessage(
        "Based on your profile, you file under Section 44ADA (Presumptive Taxation). This legally declares 50% of your consulting turnover as business expense without retaining physical bill receipts. To optimize further: classify recurring office expenses (internet, co-working rent) correctly. Do you want to run a tax audit checklist?",
        [{ label: "Run AI Tax Audit", action: "run_audit" }]
      );
    } else {
      addBotMessage(
        "Received. I am your specialized tax compliance engine. If you want to check your filing deadlines, upload a receipt photo, or review legal tax optimization schemes, let me know!",
        [{ label: "View Deadlines", action: "view_deadlines" }]
      );
    }
  };

  const handleQuickReply = (reply) => {
    // 1. Display reply in chat as user action
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: reply.label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Perform actions
    switch (reply.action) {
      case "prepare_return":
        addBotMessage(
          "Great! I have generated your draft GSTR-3B return. Net output cash liability: ₹23,400. CPIN Challan created: 2605123456789. Please submit this draft to our partner CA to initiate the filing.",
          [{ label: "Send for CA Review", action: "submit_ca_audit" }]
        );
        break;
      case "view_ledger":
        addBotMessage(
          `Your May ledger holds ${invoices.length} active invoices. Sales: ₹1,50,000, Purchase ITC: ₹3,600. You can view your full ledger details on the right Admin console under the 'Ledger' tab.`
        );
        break;
      case "optimize_tax":
        addBotMessage(
          "Under Section 44ADA, you pay tax on only 50% of your gross billing. To save more: you can invest up to ₹1.5 Lakhs under Section 80C. Would you like me to project your annual income tax liability?",
          [{ label: "Yes, Project ITR", action: "project_itr" }]
        );
        break;
      case "submit_ca_audit":
        const draftFiling = filings.find(f => f.returnType === 'GSTR-3B');
        if (draftFiling && draftFiling.status === 'Draft') {
          onUpdateFiling(draftFiling.id, { status: "Awaiting CA Review" });
          addBotMessage(
            "Draft return submitted! Our partner Chartered Accountant (CA) has been notified. They will review your invoices against GSTR-2B data on their dashboard. I will alert you once approved for tax payment."
          );
        } else {
          addBotMessage("Your draft return has already been submitted or completed.");
        }
        break;
      case "trigger_photo":
        simulateReceiptUpload();
        break;
      case "trigger_pdf":
        simulatePdfUpload();
        break;
      case "pay_tax_cpin":
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const f3b = filings.find(f => f.returnType === 'GSTR-3B');
          onUpdateFiling(f3b.id, { paymentStatus: "Paid", status: "Filed", arn: "ARN2705260904561", filingDate: new Date().toISOString().split('T')[0] });
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              sender: 'bot',
              text: "Payment Successful! Received ₹23,400 for CPIN 2605123456789. GSTR-3B successfully filed on GST Portal. Reference ARN: ARN2705260904561. Download your official acknowledgment receipt PDF below.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              fileUrl: "https://gstn.gov.in/receipts/gstr-3b-may.pdf"
            }
          ]);
        }, 1500);
        break;
      case "view_deadlines":
        addBotMessage(
          "Filing Deadlines:\n- GSTR-1: 11-June-2026\n- GSTR-3B: 20-June-2026\n- ITR-4: 31-July-2026\n- GSTR-9 (Annual): 31-Dec-2026"
        );
        break;
      default:
        addBotMessage("Alright. Let me know if you need any other tax compliance support!");
        break;
    }
  };

  const simulateReceiptUpload = () => {
    setShowAttachmentMenu(false);
    setIsTyping(true);
    // Simulate image uploading progress
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'user',
          imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=300&auto=format&fit=crop",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      setIsTyping(true);
      // Simulate AI OCR parsing
      setTimeout(() => {
        setIsTyping(false);
        const newInvoice = {
          id: `inv_${Date.now()}`,
          clientId: "cli_rohan_tech",
          type: "Purchase",
          invoiceNo: `CR/${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString().split('T')[0],
          particulars: "Croma Store (Office Equipment)",
          sacCode: "847130",
          taxableValue: 45000,
          cgst: 4050,
          sgst: 4050,
          igst: 0,
          totalAmount: 53100,
          status: "Pending CA Review",
          source: "WhatsApp (Owner Photo)",
          imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=300&auto=format&fit=crop"
        };

        // Add to database state
        onAddInvoice(newInvoice);

        // Notify in WhatsApp
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'bot',
            text: `Invoice Photo Captured! I ran OCR extraction on your image:
- Seller: Croma Stores
- Total amount: ₹53,100 (including 18% GST)
- Eligible ITC: ₹8,100
- Category: Office Electronics (Capital Assets)

This purchase has been logged in your Ledger and sent to the CA queue for input tax verification.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 2000);
    }, 1000);
  };

  const simulatePdfUpload = () => {
    setShowAttachmentMenu(false);
    setIsTyping(true);
    // Simulate PDF uploading progress
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fileUrl: "#",
          fileName: "aws-billing-may2026.pdf"
        }
      ]);

      setIsTyping(true);
      // Simulate AI OCR parsing
      setTimeout(() => {
        setIsTyping(false);
        const newInvoice = {
          id: `inv_${Date.now()}`,
          clientId: "cli_rohan_tech",
          type: "Purchase",
          invoiceNo: `AWS/2026/${Math.floor(100 + Math.random() * 900)}`,
          date: new Date().toISOString().split('T')[0],
          particulars: "Amazon Web Services (SaaS)",
          sacCode: "998315",
          taxableValue: 10000,
          cgst: 900,
          sgst: 900,
          igst: 0,
          totalAmount: 11800,
          status: "Pending CA Review",
          source: "WhatsApp (Owner PDF)",
          imageUrl: null
        };

        // Add to database state
        onAddInvoice(newInvoice);

        // Notify in WhatsApp
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'bot',
            text: `PDF Document Parsed! I extracted a tax invoice from Amazon Web Services (AWS):
- Invoice No: ${newInvoice.invoiceNo}
- Total amount: ₹11,800 (including 18% IGST)
- Eligible ITC: ₹1,800
- Category: SaaS/Cloud Infrastructure

Successfully logged under Software expenses and pushed to GSTR-3B filings.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 2000);
    }, 1000);
  };

  const simulateVoiceLedger = () => {
    setShowAttachmentMenu(false);
    setIsTyping(true);
    // Simulate speaking audio recording
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          audioMessage: "Paid ₹5,000 cash for shop painting and local labor today."
        }
      ]);

      setIsTyping(true);
      // Simulate AI OCR parsing
      setTimeout(() => {
        setIsTyping(false);
        const newInvoice = {
          id: `inv_${Date.now()}`,
          clientId: "cli_rohan_tech",
          type: "Purchase",
          invoiceNo: `CASH/LABOR/${Math.floor(10 + Math.random() * 90)}`,
          date: new Date().toISOString().split('T')[0],
          particulars: "Local Store Maintenance (Cash)",
          sacCode: "998721",
          taxableValue: 5000,
          cgst: 0,
          sgst: 0,
          igst: 0,
          totalAmount: 5000,
          status: "Verified", // Self-Voucher immediately approved
          source: "WhatsApp (Owner Voice)",
          imageUrl: null
        };

        // Add to database state
        onAddInvoice(newInvoice);

        // Notify in WhatsApp
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'bot',
            text: `Voice Note Transcribed! 
"Paid ₹5,000 cash for shop painting and local labor today."

I have categorized this under Business Maintenance Expenses. Under Income Tax rules, since you paid in cash without a GST receipt, I have generated a digital Self-Voucher for your ITR records. This legally claims the deduction without audit risk (stays below Section 40A(3) ₹10,000 limit).`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 2500);
    }, 1000);
  };

  // Listen to external CA approval to alert user to make payment on WhatsApp
  useEffect(() => {
    const isApproved = filings.some(f => f.returnType === 'GSTR-3B' && f.status === 'Approved by CA' && f.paymentStatus === 'Unpaid');
    if (isApproved) {
      const hasPayAlert = messages.some(m => m.text && m.text.includes("Approved by CA Priya"));
      if (!hasPayAlert) {
        addBotMessage(
          "ALERT: Your GSTR-3B return has been Approved by CA Priya! Net tax payment of ₹23,400 is required to complete filing. CPIN: 2605123456789. Click the link below to pay instantly via UPI.",
          [{ label: "Pay Tax via UPI (GPay/PhonePe)", action: "pay_tax_cpin" }]
        );
      }
    }
  }, [filings]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#0b141a',
      fontFamily: 'var(--font-main)',
      position: 'relative'
    }}>
      {/* Mobile Header Bar */}
      <div style={{
        background: '#1f2c34',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        zIndex: 10
      }}>
        {/* Mock avatar */}
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #0d9488 0%, #115e59 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: '700',
          fontSize: '14px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          TAX
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#e9edef' }}>AI Tax Assistant</div>
          <div style={{ fontSize: '10.5px', color: '#8696a0', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00a884', display: 'inline-block' }}></span>
            Online
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: '4px', fontSize: '9.5px', color: '#0d9488', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {activeTemplate} template
        </div>
      </div>

      {/* Chat Messages Body */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: 'linear-gradient(rgba(11, 20, 26, 0.95), rgba(11, 20, 26, 0.95)), url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")'
      }}>
        <div style={{
          alignSelf: 'center',
          background: '#182229',
          color: '#8696a0',
          fontSize: '10px',
          padding: '4px 8px',
          borderRadius: '6px',
          marginBottom: '10px',
          border: '1px solid rgba(255,255,255,0.02)'
        }}>
          TODAY
        </div>

        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            {/* Bubble */}
            <div style={{
              background: m.sender === 'user' ? '#005c4b' : '#202c33',
              color: m.sender === 'user' ? '#e9edef' : '#e9edef',
              padding: '8px 12px',
              borderRadius: m.sender === 'user' ? '8px 0px 8px 8px' : '0px 8px 8px 8px',
              fontSize: '12.5px',
              lineHeight: '1.5',
              position: 'relative',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
              whiteSpace: 'pre-line'
            }}>
              {/* Image message */}
              {m.imageUrl && (
                <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', marginBottom: '4px' }}>
                  <img src={m.imageUrl} alt="invoice" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Loader2 size={10} className="animate-spin" /> Processing OCR
                  </div>
                </div>
              )}

              {/* Text */}
              {m.text}

              {/* File Attachment Mock (PDF) */}
              {m.fileUrl && (
                <div style={{
                  marginTop: '8px',
                  background: '#111b21',
                  borderRadius: '6px',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#ea4335', color: '#fff', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '10px' }}>PDF</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10.5px', fontWeight: '600', color: '#e9edef', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                      {m.fileName || "gstr-3b-receipt.pdf"}
                    </div>
                    <div style={{ fontSize: '8.5px', color: '#8696a0' }}>142 KB</div>
                  </div>
                  <span style={{ fontSize: '9px', color: '#0d9488', fontWeight: '700' }}>Attached</span>
                </div>
              )}

              {/* Audio Message Mock */}
              {m.audioMessage && (
                <div style={{
                  marginTop: '4px',
                  background: '#111b21',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <Volume2 size={16} color="#00a884" className="animate-pulse" />
                  <div style={{ flex: 1 }}>
                    <div style={{ height: '3px', background: '#2a3942', borderRadius: '2px', position: 'relative' }}>
                      <div style={{ width: '60%', height: '100%', background: '#00a884', borderRadius: '2px' }}></div>
                    </div>
                    <div style={{ fontSize: '8px', color: '#8696a0', marginTop: '4px' }}>Spoken Voice Ledger • 0:05</div>
                  </div>
                </div>
              )}

              {/* Time + Status stamp */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '4px',
                fontSize: '9px',
                color: m.sender === 'user' ? '#86bda7' : '#8696a0',
                marginTop: '4px',
                textAlign: 'right'
              }}>
                <span>{m.timestamp}</span>
                {m.sender === 'user' && <CheckCheck size={11} color="#53bdeb" />}
              </div>
            </div>

            {/* Quick replies bubbles */}
            {m.quickReplies && m.quickReplies.length > 0 && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '4px',
                marginBottom: '8px'
              }}>
                {m.quickReplies.map((r, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(r)}
                    style={{
                      background: 'rgba(13, 148, 136, 0.08)',
                      border: '1px solid rgba(13, 148, 136, 0.3)',
                      borderRadius: '16px',
                      padding: '6px 14px',
                      color: '#0d9488',
                      fontSize: '11.5px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(13, 148, 136, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(13, 148, 136, 0.08)';
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{
            alignSelf: 'flex-start',
            background: '#202c33',
            color: '#8696a0',
            padding: '8px 16px',
            borderRadius: '0px 8px 8px 8px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            <Loader2 size={12} className="animate-spin" />
            <span>AI Tax Assistant is typing...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Dynamic Popover Attachment Menu */}
      {showAttachmentMenu && (
        <div style={{
          position: 'absolute',
          bottom: '56px',
          left: '12px',
          background: '#233138',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 999,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          animation: 'fadeIn 0.2s ease'
        }}>
          {/* Option A: Document PDF */}
          <button
            type="button"
            onClick={simulatePdfUpload}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#e9edef',
              fontSize: '11px',
              fontWeight: '600',
              padding: '6px 10px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#7f66ff', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: '#fff' }}>
              <FileText size={13} />
            </div>
            Document (PDF Invoice)
          </button>

          {/* Option B: Photo Receipt */}
          <button
            type="button"
            onClick={simulateReceiptUpload}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#e9edef',
              fontSize: '11px',
              fontWeight: '600',
              padding: '6px 10px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#ec407a', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: '#fff' }}>
              <Image size={13} />
            </div>
            Camera (Photo Receipt)
          </button>

          {/* Option C: Voice Ledger */}
          <button
            type="button"
            onClick={simulateVoiceLedger}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#e9edef',
              fontSize: '11px',
              fontWeight: '600',
              padding: '6px 10px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#00e676', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: '#fff' }}>
              <Mic size={13} />
            </div>
            Voice Note (Log Cash Expense)
          </button>
        </div>
      )}

      {/* Input Tray Footer */}
      <form
        onSubmit={(e) => handleSendMessage(inputText, e)}
        style={{
          background: '#1f2c34',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          zIndex: 10
        }}
      >
        <button
          type="button"
          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
          style={{
            background: showAttachmentMenu ? 'rgba(255,255,255,0.05)' : 'transparent',
            border: 'none',
            color: showAttachmentMenu ? 'var(--accent)' : '#8696a0',
            padding: '6px',
            cursor: 'pointer',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          title="Attach File / Document / Voice"
        >
          {showAttachmentMenu ? <X size={18} /> : <Paperclip size={18} />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type message or attach invoices..."
          style={{
            flex: 1,
            background: '#2a3942',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 14px',
            color: '#e9edef',
            fontSize: '12px',
            outline: 'none'
          }}
        />

        {inputText.trim() ? (
          <button
            type="submit"
            style={{
              background: '#00a884',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Send size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setIsRecording(!isRecording);
              if (!isRecording) {
                // Simulate speaking a voice query
                setInputText("Can I claim GST tax credit on laptop purchase?");
              }
            }}
            style={{
              background: isRecording ? '#ea4335' : 'transparent',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: isRecording ? '#fff' : '#8696a0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Ask Voice Query"
          >
            <Mic size={16} className={isRecording ? "animate-pulse" : ""} />
          </button>
        )}
      </form>
    </div>
  );
}
