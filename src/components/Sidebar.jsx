import React from 'react';
import { Layout, MessageSquare, Users, BarChart3, Globe, Sparkles, Receipt, Scale, UserCheck } from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, clinicName }) {
  const tabs = [
    { id: 'onboarding', name: 'WhatsApp Sandbox', icon: MessageSquare },
    { id: 'caretaker', name: 'Audit Queue', icon: UserCheck },
    { id: 'crm', name: 'Transaction Ledger', icon: Receipt },
    { id: 'analytics', name: 'Notices Scrutiny', icon: Scale },
    { id: 'domains', name: 'Org Configurations', icon: Globe }
  ];

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      background: 'rgba(10, 11, 18, 0.6)',
      borderRight: '1px solid var(--border-color)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Brand Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '32px',
        paddingLeft: '8px'
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: '800',
          fontSize: '14px',
          fontFamily: 'var(--font-heading)'
        }}>
          T
        </div>
        <div>
          <span style={{ 
            fontWeight: 800, 
            fontSize: '15px', 
            color: 'var(--text-primary)', 
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.5px',
            display: 'block'
          }}>
            TaxOps AI
          </span>
          <span style={{ 
            fontSize: '9px', 
            color: 'var(--accent)', 
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '700',
            display: 'block',
            marginTop: '-2px'
          }}>
            WhatsApp OS
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                background: isActive ? 'var(--accent-glow)' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontWeight: isActive ? '600' : '400',
                fontSize: '13px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent'
              }}
            >
              <Icon size={16} color={isActive ? 'var(--accent)' : 'var(--text-secondary)'} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Active Client Summary Card */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '14px',
        marginTop: 'auto'
      }}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
          ACTIVE ENTITY
        </span>
        <strong style={{ 
          fontSize: '12px', 
          color: 'var(--text-primary)', 
          fontFamily: 'var(--font-heading)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block' 
        }}>
          {clinicName}
        </strong>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          fontSize: '10px', 
          color: '#10b981', 
          marginTop: '6px',
          fontWeight: '600'
        }}>
          <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></span>
          GSTIN: Maharashtra
        </div>
      </div>
    </aside>
  );
}
