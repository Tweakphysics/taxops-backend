import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import WhatsAppChat from './components/WhatsAppChat';
import AdminDashboard from './components/AdminDashboard';
import { businessTemplates } from './utils/businessTemplates';
import { initialClients, initialInvoices, initialFilings, initialNotices } from './utils/mockDatabase';
import { Smartphone, Monitor, Code, HelpCircle, FileText, CheckCircle, Info } from 'lucide-react';

export default function App() {
  // Global simulated database state
  const [clients, setClients] = useState(initialClients);
  const [activeClientKey, setActiveClientKey] = useState('consultant'); // consultant, trader, or educator
  const [invoices, setInvoices] = useState(initialInvoices);
  const [filings, setFilings] = useState(initialFilings);
  const [notices, setNotices] = useState(initialNotices);

  const [activeTab, setActiveTab] = useState('onboarding'); // onboarding (WhatsApp), caretaker (Audit), crm (Ledger), analytics (Notices), domains (Config)
  const [previewMode, setPreviewMode] = useState('mobile'); // WhatsApp mobile view toggle
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, type: "system", msg: "TaxOps OS Node initialized successfully.", time: "11:07" },
    { id: 2, type: "db", msg: "PostgreSQL schemas synced with Supabase storage pools.", time: "11:08" },
    { id: 3, type: "agent", msg: "Gemini 1.5 OCR extraction service listening on port 8000.", time: "11:08" }
  ]);

  // Derived active client based on selected template context
  const activeClient = clients.find(c => c.activeTemplate === activeClientKey) || clients[0];
  const activeTemplate = businessTemplates[activeClientKey];

  // Callback handlers
  const handleAddInvoice = (newInv) => {
    setInvoices((prev) => [newInv, ...prev]);
    // Append a system log
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSystemLogs((prev) => [
      { id: Date.now(), type: "ocr", msg: `OCR Process: Extracted invoice ${newInv.invoiceNo} from photo (Particulars: ${newInv.particulars}, GST: ₹${newInv.cgst + newInv.sgst}).`, time: timestamp },
      ...prev
    ]);
  };

  const handleVerifyInvoice = (id) => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Verified" } : i))
    );
    // Automatically recalculate and update filings tax totals!
    const activeInvoices = invoices.map(i => i.id === id ? { ...i, status: "Verified" } : i);
    const updatedItc = activeInvoices
      .filter(i => i.clientId === activeClient.id && i.type === 'Purchase' && i.status === 'Verified')
      .reduce((sum, i) => sum + (i.cgst + i.sgst + i.igst), 0);

    setFilings((prev) =>
      prev.map((f) => {
        if (f.clientId === activeClient.id && f.returnType === 'GSTR-3B' && f.status === 'Draft') {
          return {
            ...f,
            totalInputTax: updatedItc,
            netTaxDue: Math.max(0, f.totalOutputTax - updatedItc)
          };
        }
        return f;
      })
    );

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSystemLogs((prev) => [
      { id: Date.now(), type: "ca", msg: `CA Action: Verified input tax credit for invoice ${id}. Tax Ledger updated.`, time: timestamp },
      ...prev
    ]);
  };

  const handleUpdateFiling = (id, updates) => {
    setFilings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSystemLogs((prev) => [
      { id: Date.now(), type: "filing", msg: `Filing state updated for GSTR-3B: Status is now '${updates.status || 'Paid'}'.`, time: timestamp },
      ...prev
    ]);
  };

  const handleResolveNotice = (id) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "Resolved" } : n))
    );
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSystemLogs((prev) => [
      { id: Date.now(), type: "notice", msg: `Legal notice ${id} response successfully e-filed to portal. Scrutiny closed.`, time: timestamp },
      ...prev
    ]);
  };

  const handleUpdateClientField = (field, val) => {
    setClients((prev) =>
      prev.map((c) => (c.activeTemplate === activeClientKey ? { ...c, [field]: val } : c))
    );
  };

  const handleSwitchTemplate = (key) => {
    setActiveClientKey(key);
    // Recalculate or load template-specific filings
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSystemLogs((prev) => [
      { id: Date.now(), type: "template", msg: `System Context: Loaded dynamic JSON schema for '${businessTemplates[key].businessType}'. Active reminders & SAC codes updated.`, time: timestamp },
      ...prev
    ]);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      background: '#07080e',
      color: '#fff',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* 1. Left Lateral Dashboard Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        businessName={activeClient.legalName}
      />

      {/* 2. Main Central Active Workspace Pane */}
      <main style={{
        flex: 1,
        borderRight: '1px solid #1f2c3f',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        {activeTab === 'onboarding' ? (
          /* WHATSAPP SANDBOX: Show Developer Guide & System Logs on Left, Chat on Right */
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', height: '90%', overflowY: 'auto' }}>
            <div style={{ background: 'rgba(13, 148, 136, 0.04)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(13, 148, 136, 0.2)' }}>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontFamily: 'var(--font-heading)' }}>WhatsApp Chatbot Sandbox</h2>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Test the end-to-end user journeys using the interactive mobile screen on the right. You can type conversational tax queries, upload receipts (OCR simulation), and execute mock UPI tax payments.
              </p>
            </div>

            {/* Template Selector Console */}
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '12.5px', fontFamily: 'var(--font-heading)', color: 'var(--accent)' }}>JSON Template Engine Switcher</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                {Object.keys(businessTemplates).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSwitchTemplate(key)}
                    style={{
                      flex: 1,
                      background: activeClientKey === key ? 'rgba(13, 148, 136, 0.15)' : 'rgba(255,255,255,0.02)',
                      border: activeClientKey === key ? '1px solid #0d9488' : '1px solid var(--border-color)',
                      color: activeClientKey === key ? '#0d9488' : 'var(--text-secondary)',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {businessTemplates[key].businessType} Schema
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-secondary)', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                <strong>Active Description:</strong> {activeTemplate.description}<br />
                <strong>Default Tax Rate:</strong> {activeTemplate.billingRules.gstRateDefault}% | <strong>Tax Scheme:</strong> {activeClient.scheme}
              </div>
            </div>

            {/* Live System telemetry logs */}
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', fontSize: '11.5px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size={13} color="var(--accent)" /> System Telemetry Logs (FastAPI + Supabase)
              </div>
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '10.5px' }}>
                {systemLogs.map((log) => (
                  <div key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>[{log.time}]</span>{' '}
                    <span style={{
                      color: log.type === 'ocr' ? '#0d9488' : log.type === 'ca' ? '#a78bfa' : log.type === 'notice' ? '#ef4444' : '#60a5fa',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>[{log.type}]</span>{' '}
                    <span style={{ color: '#e2e8f0' }}>{log.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* CA & ADMIN DASHBOARD SUBTABS: Render Admin Console directly on Left */
          <AdminDashboard
            client={activeClient}
            invoices={invoices.filter(i => i.clientId === activeClient.id)}
            onVerifyInvoice={handleVerifyInvoice}
            filings={filings.filter(f => f.clientId === activeClient.id)}
            onApproveFiling={handleUpdateFiling}
            notices={notices.filter(n => n.clientId === activeClient.id)}
            onResolveNotice={handleResolveNotice}
            activeTab={activeTab}
          />
        )}
      </main>

      {/* 3. Right Panel: WhatsApp Mobile Simulator Screen (Always Present!) */}
      <section style={{
        width: '420px',
        background: '#090a0f',
        borderLeft: '1px solid #1f2c3f',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        {/* Controls header */}
        <div style={{
          background: 'rgba(10, 11, 18, 0.4)',
          borderBottom: '1px solid #1f2c3f',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smartphone size={14} color="var(--accent)" />
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)' }}>WhatsApp Device Simulation</span>
          </div>
          <span style={{ fontSize: '9px', background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
            Live Sync Active
          </span>
        </div>

        {/* Live Mobile view */}
        <div style={{
          flex: 1,
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            border: '8px solid #2d3748',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
            background: '#0b141a',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <WhatsAppChat
              client={activeClient}
              invoices={invoices.filter(i => i.clientId === activeClient.id)}
              onAddInvoice={handleAddInvoice}
              filings={filings.filter(f => f.clientId === activeClient.id)}
              onUpdateFiling={handleUpdateFiling}
              activeTemplate={activeClientKey}
              onUpdateClientField={handleUpdateClientField}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
