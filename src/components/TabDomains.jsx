import React, { useState } from 'react';
import { Globe, Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function TabDomains({ clinicName }) {
  const [domainName, setDomainName] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedDomain, setConnectedDomain] = useState(null);

  const cleanName = clinicName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const suggestedDomain = `${cleanName || 'smiles'}.com`;

  const handleConnect = (e) => {
    e.preventDefault();
    if (!domainName.trim()) return;

    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setConnectedDomain(domainName);
      setDomainName('');
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        paddingBottom: '12px',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '16px'
      }}>
        <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
          Domains & Professional Mailboxes
        </h3>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
          DNS Automation & Brand Verification
        </span>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        flex: 1,
        overflowY: 'auto'
      }}>
        {/* Connection Box */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={16} color="var(--accent)" />
            Connect Custom Domain
          </h4>

          {connectedDomain ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              color: '#10b981',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'fadeIn 0.25s ease'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} />
                Domain <strong>{connectedDomain}</strong> is active & SECURE!
              </span>
              <button 
                onClick={() => setConnectedDomain(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <form onSubmit={handleConnect} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <input
                type="text"
                required
                className="chat-input-box"
                style={{ flex: 1, padding: '8px 12px', fontSize: '12px' }}
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                placeholder="e.g. smilecraftdental.com"
              />
              <button type="submit" className="btn-primary" style={{ padding: '0 16px', fontSize: '12px' }} disabled={isConnecting}>
                {isConnecting ? "Connecting DNS..." : "Connect Domain"}
              </button>
            </form>
          )}

          {!connectedDomain && (
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px dashed var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '12px',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>💡 Suggested domain: <strong>{suggestedDomain}</strong> is available!</span>
              <button 
                onClick={() => setDomainName(suggestedDomain)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Buy for $10 <ArrowRight size={10} />
              </button>
            </div>
          )}
        </div>

        {/* Mailbox Section */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={16} color="var(--accent)" />
            Professional Mailbox Setup
          </h4>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>
            Generate matching professional emails (e.g. `dr.sarah@${connectedDomain || 'yourdomain.com'}`) in 1 click under the hood. No Google Workspace registration or DNS configuration pain required!
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.03)',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '10.5px',
            color: 'var(--text-muted)'
          }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Includes spam protection, SSL certificates, and auto-SPF verification natively.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
