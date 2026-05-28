import React, { useState } from 'react';
import { Users, PhoneCall, Mail, MessageSquare, Plus, PlusCircle, CheckCircle } from 'lucide-react';

export default function TabCRM({ leads, onUpdateStatus, onAddManualLead }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newService, setNewService] = useState('Dental Implant');
  const [newNotes, setNewNotes] = useState('');

  const [activeCall, setActiveCall] = useState(null);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' };
      case 'Contacted':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' };
      case 'Booked':
        return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' };
      default:
        return { bg: 'rgba(255,255,255,0.05)', color: '#fff' };
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    onAddManualLead({
      name: newName,
      phone: newPhone,
      service: newService,
      status: 'New',
      notes: newNotes || "Manually created lead.",
      date: new Date().toISOString().split('T')[0],
      value: newService === 'Dental Implant' ? '$2,800' : '$350'
    });

    setShowAddModal(false);
    setNewName('');
    setNewPhone('');
    setNewNotes('');
  };

  const simulateCall = (name) => {
    setActiveCall(name);
    setTimeout(() => {
      setActiveCall(null);
    }, 3000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '20px'
    }}>
      {/* CRM Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '16px'
      }}>
        <div>
          <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
            Patient Leads & CRM
          </h3>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
            Niche Profile: Dentist / Family Clinic Schema
          </span>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          style={{
            background: 'var(--accent)',
            border: 'none',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Plus size={12} /> Add Lead
        </button>
      </div>

      {/* Dial Alert */}
      {activeCall && (
        <div style={{
          background: 'var(--accent-glow)',
          border: '1px solid var(--accent)',
          borderRadius: '8px',
          padding: '10px 14px',
          marginBottom: '12px',
          color: 'var(--text-primary)',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <span className="pulse-accent" style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></span>
          <span>Calling <strong>{activeCall}</strong> using your US Virtual +1 number...</span>
        </div>
      )}

      {/* CRM Leads Table */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '11.5px',
          textAlign: 'left'
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '8px', fontWeight: '500' }}>Patient Details</th>
              <th style={{ padding: '8px', fontWeight: '500' }}>Requested Service</th>
              <th style={{ padding: '8px', fontWeight: '500' }}>Status</th>
              <th style={{ padding: '8px', fontWeight: '500' }}>Date</th>
              <th style={{ padding: '8px', fontWeight: '500' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const statusStyle = getStatusStyle(lead.status);
              return (
                <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '12px 8px' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{lead.name}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{lead.phone}</span>
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{lead.service}</span>
                    <span style={{ display: 'block', fontSize: '9px', color: 'var(--accent)', fontWeight: '600' }}>{lead.value}</span>
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                      style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        border: statusStyle.border,
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontWeight: '700',
                        fontSize: '9.5px',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="New" style={{ background: '#11131d', color: '#ef4444' }}>New</option>
                      <option value="Contacted" style={{ background: '#11131d', color: '#f59e0b' }}>Contacted</option>
                      <option value="Booked" style={{ background: '#11131d', color: '#10b981' }}>Booked</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>
                    {lead.date}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => simulateCall(lead.name)}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '4px',
                          padding: '4px',
                          color: 'var(--text-primary)',
                          cursor: 'pointer'
                        }}
                        title="Simulate Outbound Call"
                      >
                        <PhoneCall size={12} color="var(--accent)" />
                      </button>
                      <button 
                        onClick={() => alert(`In a real setup, this opens an SMS chat inside the portal: ${lead.phone}`)}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '4px',
                          padding: '4px',
                          color: 'var(--text-primary)',
                          cursor: 'pointer'
                        }}
                      >
                        <MessageSquare size={12} color="var(--text-secondary)" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Lead Modal Form */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '16px'
        }}>
          <div className="glass-panel" style={{
            padding: '24px',
            width: '100%',
            maxWidth: '360px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Add Patient Lead Manually
            </h4>

            <form onSubmit={handleManualSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Name</label>
                <input 
                  type="text" 
                  required 
                  className="chat-input-box" 
                  style={{ width: '100%', padding: '8px', fontSize: '12px' }}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Patient Full Name"
                />
              </div>

              <div>
                <label style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Phone</label>
                <input 
                  type="tel" 
                  required 
                  className="chat-input-box" 
                  style={{ width: '100%', padding: '8px', fontSize: '12px' }}
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Service Needed</label>
                <select 
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: '#11131d',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                >
                  <option>Dental Implant</option>
                  <option>Teeth Whitening</option>
                  <option>General Cleaning & Checkup</option>
                  <option>Emergency Root Canal</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Staff Notes</label>
                <textarea 
                  className="chat-input-box" 
                  style={{ width: '100%', padding: '8px', fontSize: '12px', height: '60px', resize: 'none' }}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Notes from initial contact..."
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{
                    flex: 1.5,
                    background: 'var(--accent)',
                    border: 'none',
                    color: '#fff',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Add Patient Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
