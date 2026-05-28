// Partner CA & Reseller Admin Console Component
import React, { useState } from 'react';
import { initialTickets } from '../utils/mockDatabase';
import {
  FileText, ClipboardList, AlertOctagon, UserPlus, ShieldAlert,
  CheckCircle, Play, Mic, RefreshCw, Send, HelpCircle, Info
} from 'lucide-react';

export default function AdminDashboard({
  client,
  invoices,
  onVerifyInvoice,
  filings,
  onApproveFiling,
  notices,
  onResolveNotice,
  activeTab,
  onAddTicket
}) {
  const [subTab, setSubTab] = useState('audit'); // audit, ledger, notices, config, support
  const [glitchText, setGlitchText] = useState("");
  const [isRecordingGlitch, setIsRecordingGlitch] = useState(false);
  const [tickets, setTickets] = useState(initialTickets);

  // Stats derivations
  const totalSales = invoices
    .filter(i => i.type === 'Sales')
    .reduce((sum, i) => sum + i.taxableValue, 0);

  const totalGstCollected = invoices
    .filter(i => i.type === 'Sales')
    .reduce((sum, i) => sum + (i.cgst + i.sgst + i.igst), 0);

  const totalItcClaimed = invoices
    .filter(i => i.type === 'Purchase' && i.status === 'Verified')
    .reduce((sum, i) => sum + (i.cgst + i.sgst + i.igst), 0);

  const pendingFiling3B = filings.find(f => f.returnType === 'GSTR-3B');

  const handleApproveReturn = (id) => {
    onApproveFiling(id, { status: "Approved by CA" });
  };

  const handleReportGlitchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!glitchText.trim()) return;

    const newTicket = {
      id: `tic_${Date.now()}`,
      userId: "usr_ca_priya12",
      userName: "Priya Sharma (Partner CA)",
      pageUrl: "/admin/clients/rohan-tech/gst-filing",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      transcription: glitchText,
      diagnosis: glitchText.toLowerCase().includes('503') || glitchText.toLowerCase().includes('gateway')
        ? "Government GSTN API Gateway returned 503 Service Unavailable due to scheduled Sunday maintenance."
        : "Local client cache mismatch between PostgreSQL state and Supabase Storage bucket assets.",
      solution: glitchText.toLowerCase().includes('503') || glitchText.toLowerCase().includes('gateway')
        ? "Queued return filing to auto-retry at 4:00 PM once gateway recovers. Alerted developer team."
        : "Re-indexed document records in Supabase. Tap 'Force Refresh' to apply cache rebuild.",
      status: "Diagnosed"
    };

    setTickets(prev => [newTicket, ...prev]);
    setGlitchText("");
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#090a10',
      color: '#fff',
      fontFamily: 'var(--font-main)'
    }}>
      {/* Console Subtab Navigation Header */}
      <div style={{
        background: 'rgba(10, 11, 18, 0.6)',
        borderBottom: '1px solid var(--border-color)',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setSubTab('audit')}
            style={{
              background: subTab === 'audit' ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: 'none',
              color: subTab === 'audit' ? 'var(--accent)' : 'var(--text-secondary)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ClipboardList size={13} /> Audit Queue
          </button>
          <button
            onClick={() => setSubTab('ledger')}
            style={{
              background: subTab === 'ledger' ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: 'none',
              color: subTab === 'ledger' ? 'var(--accent)' : 'var(--text-secondary)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileText size={13} /> Ledger
          </button>
          <button
            onClick={() => setSubTab('notices')}
            style={{
              background: subTab === 'notices' ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: 'none',
              color: subTab === 'notices' ? 'var(--accent)' : 'var(--text-secondary)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <AlertOctagon size={13} /> Notices
            {notices.filter(n => n.status !== 'Resolved').length > 0 && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></span>
            )}
          </button>
          <button
            onClick={() => setSubTab('config')}
            style={{
              background: subTab === 'config' ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: 'none',
              color: subTab === 'config' ? 'var(--accent)' : 'var(--text-secondary)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <UserPlus size={13} /> Org Settings
          </button>
          <button
            onClick={() => setSubTab('support')}
            style={{
              background: subTab === 'support' ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: 'none',
              color: subTab === 'support' ? 'var(--accent)' : 'var(--text-secondary)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <HelpCircle size={13} /> AI Diagnostics
          </button>
        </div>

        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
          CA Dashboard Active
        </div>
      </div>

      {/* Main Console Content Body */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        
        {/* SUBTAB 1: AUDIT QUEUE */}
        {subTab === 'audit' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontFamily: 'var(--font-heading)' }}>Filing Verification Queue</h3>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>Review user-uploaded receipts against automated AI OCR extractions and cross-reference GSTR-2B datasets.</p>
            </div>

            {/* Pending Invoices cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {invoices.filter(i => i.status === 'Pending CA Review').length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
                  <CheckCircle size={32} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
                  <span>Audit Queue Empty. All invoices are verified and matching GSTR-2B records!</span>
                </div>
              ) : (
                invoices.filter(i => i.status === 'Pending CA Review').map((inv) => (
                  <div key={inv.id} style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* Header */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--text-primary)' }}>{inv.particulars}</span>
                      <span style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706', padding: '2px 8px', borderRadius: '4px', fontSize: '9.5px', fontWeight: '700' }}>{inv.status}</span>
                    </div>

                    {/* Dual panel review */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)' }}>
                      {/* Left: Raw Upload image card */}
                      <div style={{ flex: '1 1 200px', padding: '16px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Raw Upload Asset</div>
                        {inv.imageUrl ? (
                          <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative', height: '140px' }}>
                            <img src={inv.imageUrl} alt="receipt" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        ) : (
                          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', borderRadius: '6px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '11px' }}>
                            No Image (Logged via text/PDF)
                          </div>
                        )}
                        <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Source: {inv.source}</div>
                      </div>

                      {/* Right: AI OCR Extractions */}
                      <div style={{ flex: '2 1 300px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI Extracted Fields</div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Invoice No</div>
                            <input type="text" defaultValue={inv.invoiceNo} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 8px', width: '80%', color: '#fff', fontSize: '11px' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Taxable Value (₹)</div>
                            <input type="text" defaultValue={inv.taxableValue} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 8px', width: '80%', color: '#fff', fontSize: '11px' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>SAC/HSN Code</div>
                            <input type="text" defaultValue={inv.sacCode} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 8px', width: '80%', color: '#fff', fontSize: '11px' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>CGST + SGST (₹)</div>
                            <div style={{ fontSize: '11px', color: '#fff', padding: '4px 0' }}>{inv.cgst} + {inv.sgst} (18% GST)</div>
                          </div>
                        </div>

                        <div style={{ background: 'rgba(16, 185, 129, 0.04)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.1)', fontSize: '10.5px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle size={12} />
                          <span>GSTR-2B verification: GSTIN matches supplier database! Eligible for ITC.</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions tray */}
                    <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button onClick={() => onVerifyInvoice(inv.id)} style={{ background: '#0d9488', border: 'none', color: '#fff', borderRadius: '6px', padding: '6px 16px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' }}>
                        Approve ITC and Log
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* CA return filing approvals */}
            {filings.filter(f => f.status === 'Awaiting CA Review').length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Returns Pending Final filing Signature</div>
                {filings.filter(f => f.status === 'Awaiting CA Review').map((fil) => (
                  <div key={fil.id} style={{
                    background: 'rgba(13, 148, 136, 0.02)',
                    border: '1px solid rgba(13, 148, 136, 0.3)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '700' }}>{fil.returnType} Tax Return Compilation</div>
                        <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Period: {fil.period} | Due: {fil.dueDate}</div>
                      </div>
                      <span style={{ background: 'rgba(13, 148, 136, 0.1)', color: '#0d9488', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: '700' }}>{fil.status}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '10px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                      <div>
                        <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Taxable Sales</div>
                        <div style={{ fontSize: '12px', fontWeight: '600' }}>₹{fil.taxableSales}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Output Liability</div>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#ef4444' }}>₹{fil.totalOutputTax}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Aggregated ITC</div>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#10b981' }}>₹{fil.totalInputTax}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Net Cash Due</div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)' }}>₹{fil.netTaxDue}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button onClick={() => handleApproveReturn(fil.id)} style={{ background: '#0d9488', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>
                        Approve & Issue UPI Challan Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: TRANSACTION LEDGER */}
        {subTab === 'ledger' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Monthly Sales</div>
                <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '6px' }}>₹{totalSales}</div>
                <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>GST Collected: ₹{totalGstCollected}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Input Tax Credit (ITC)</div>
                <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '6px', color: '#10b981' }}>₹{totalItcClaimed}</div>
                <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>Reconciled against GSTR-2B</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Net Cash Liability</div>
                <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '6px', color: 'var(--accent)' }}>
                  ₹{Math.max(0, totalGstCollected - totalItcClaimed)}
                </div>
                <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>Status: {pendingFiling3B ? pendingFiling3B.status : "Filed"}</div>
              </div>
            </div>

            {/* Transaction Grid */}
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', fontSize: '12px', fontWeight: '700' }}>Active Ledger Transactions</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '10px 16px' }}>Invoice No</th>
                    <th style={{ padding: '10px 16px' }}>Particulars</th>
                    <th style={{ padding: '10px 16px' }}>Type</th>
                    <th style={{ padding: '10px 16px' }}>Taxable Amt</th>
                    <th style={{ padding: '10px 16px' }}>Tax Split</th>
                    <th style={{ padding: '10px 16px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '700' }}>{inv.invoiceNo}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-primary)' }}>{inv.particulars}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          background: inv.type === 'Sales' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                          color: inv.type === 'Sales' ? '#10b981' : '#3b82f6',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '9.5px',
                          fontWeight: '700'
                        }}>{inv.type}</span>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '600' }}>₹{inv.taxableValue}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                        {inv.igst > 0 ? `IGST ₹${inv.igst}` : `C+S ₹${inv.cgst + inv.sgst}`}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          color: inv.status === 'Verified' ? '#10b981' : '#d97706',
                          fontWeight: '600'
                        }}>{inv.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBTAB 3: LEGAL NOTICES */}
        {subTab === 'notices' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.03)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <ShieldAlert color="#ef4444" size={24} />
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '13.5px', color: '#ef4444', fontWeight: '700' }}>Active GST Scrutiny Notices</h3>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>The system automatically monitors and parses official departmental correspondence forwarded by the user.</p>
              </div>
            </div>

            {notices.map((n) => (
              <div key={n.id} style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>{n.noticeType}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Issued: {n.issuedDate} | Reply Deadline: {n.replyDeadline}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontSize: '9.5px', fontWeight: '700' }}>Severity: {n.severity}</span>
                    <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '9.5px', fontWeight: '700' }}>{n.status}</span>
                  </div>
                </div>

                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '11px', color: 'var(--text-primary)', borderLeft: '3px solid #ef4444' }}>
                  <strong>Notice Scrutiny Analysis (Claude 3.5):</strong><br />
                  {n.content}
                </div>

                {/* AI Draft Response */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: '600' }}>AI Prepared Legal Reply Draft (ASMT-11)</div>
                  <textarea
                    readOnly
                    value={n.aiReplyTemplate}
                    style={{
                      background: 'rgba(10,11,18,0.6)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '12px',
                      color: 'var(--text-secondary)',
                      fontFamily: 'monospace',
                      fontSize: '10.5px',
                      height: '140px',
                      resize: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button onClick={() => onResolveNotice(n.id)} style={{ background: '#0d9488', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>
                    Approve and Submit Reply to Portal
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUBTAB 4: ORG SETTINGS */}
        {subTab === 'config' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontFamily: 'var(--font-heading)' }}>Multi-Store & Employee Permissions</h3>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>Whitelist secondary staff phone numbers or configure state branch settings linked to your tax profile.</p>
            </div>

            {/* GSTIN / Store configuration list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Enterprise Profiles</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>PAN Card Identifier</div>
                    <div style={{ fontSize: '12px', fontWeight: '700', marginTop: '2px' }}>{client.pan}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Legal Entity Name</div>
                    <div style={{ fontSize: '12px', fontWeight: '700', marginTop: '2px' }}>{client.legalName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>GSTIN Registration</div>
                    <div style={{ fontSize: '12px', fontWeight: '700', marginTop: '2px' }}>{client.gstin}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Default Tax Scheme</div>
                    <div style={{ fontSize: '12px', fontWeight: '700', marginTop: '2px' }}>{client.scheme}</div>
                  </div>
                </div>
              </div>

              {/* Operator Whitelisting */}
              <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Whitelisted WhatsApp Personnel</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '6px' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700' }}>Rohan Sharma (Owner)</div>
                      <div style={{ fontSize: '9.5px', color: '#0d9488' }}>Primary Access - Payments & Final Filings</div>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{client.mobile}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '6px' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700' }}>Amit (Store Employee)</div>
                      <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>Scoped Access - Invoice & Receipt Uploads Only</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="text"
                        defaultValue={client.employeeMobile || "+91 99999 88888"}
                        onChange={(e) => onUpdateClientField('employeeMobile', e.target.value)}
                        style={{
                          background: 'rgba(0,0,0,0.4)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '4px',
                          color: '#fff',
                          fontSize: '11px',
                          padding: '2px 8px',
                          width: '120px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: HELP & AI DIAGNOSTICS */}
        {subTab === 'support' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontFamily: 'var(--font-heading)' }}>AI Debugging & Help Console</h3>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>Run voice diagnostics if you encounter dashboard glitches or server filing connection delays.</p>
            </div>

            {/* Diagnostic microphone block */}
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Record Spoken Diagnostic Ticket</div>
              
              <form onSubmit={handleReportGlitchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <textarea
                    value={glitchText}
                    onChange={(e) => setGlitchText(e.target.value)}
                    placeholder="Describe dashboard glitch, or click the mic to record voice note (e.g. 'Filing button threw 503 error for client Rohan')..."
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      width: '95%',
                      height: '70px',
                      color: '#fff',
                      fontSize: '11px',
                      padding: '12px',
                      resize: 'none',
                      outline: 'none'
                    }}
                  />
                  
                  {/* Floating diagnostic mic */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecordingGlitch(!isRecordingGlitch);
                      if (!isRecordingGlitch) {
                        setGlitchText("Rohan's GSTR-3B return submission is spinning and throwing a 503 gateway error. Can you help?");
                      }
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: isRecordingGlitch ? '#ef4444' : 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Mic size={13} className={isRecordingGlitch ? "animate-pulse" : ""} />
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', color: 'var(--text-secondary)' }}>
                    <Info size={11} />
                    <span>Diagnostics will capture console state & GSP API telemetry automatically.</span>
                  </div>
                  <button type="submit" style={{ background: '#0d9488', border: 'none', color: '#fff', borderRadius: '6px', padding: '6px 14px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Send size={11} /> Analyze Glitch
                  </button>
                </div>
              </form>
            </div>

            {/* List of diagnostic logs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Diagnostic Logs & Resolutions</div>
              {tickets.map((t) => (
                <div key={t.id} style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700' }}>{t.userName}</span>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{t.timestamp}</span>
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', padding: '6px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', fontStyle: 'italic' }}>
                    "{t.transcription}"
                  </div>

                  <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10.5px' }}>
                    <div><span style={{ color: '#ef4444', fontWeight: '600' }}>AI Diagnosis:</span> {t.diagnosis}</div>
                    <div><span style={{ color: '#10b981', fontWeight: '600' }}>AI Action Plan:</span> {t.solution}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '2px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: '700' }}>{t.status}</span>
                    {t.status === 'Diagnosed' && (
                      <button onClick={() => {
                        const nextTickets = tickets.map(x => x.id === t.id ? { ...x, status: "Resolved & Synced" } : x);
                        setTickets(nextTickets);
                      }} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '9.5px', cursor: 'pointer' }}>
                        Force Cache Sync
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
