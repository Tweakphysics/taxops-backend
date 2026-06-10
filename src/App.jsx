import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import WhatsAppChat from './components/WhatsAppChat';
import AdminDashboard from './components/AdminDashboard';
import BusinessHealthCenter from './components/BusinessHealthCenter';
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
          <BusinessHealthCenter
            client={activeClient}
            invoices={invoices.filter(i => i.clientId === activeClient.id)}
            filings={filings.filter(f => f.clientId === activeClient.id)}
            notices={notices.filter(n => n.clientId === activeClient.id)}
            systemLogs={systemLogs}
            activeTemplate={activeClientKey}
            onSelectTab={setActiveTab}
            onSwitchTemplate={handleSwitchTemplate}
          />
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
