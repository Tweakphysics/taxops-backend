// Premium Business Health Center Dashboard Component
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, 
  FileText, Clock, TrendingUp, Code, ChevronDown, ChevronUp, Loader2 
} from 'lucide-react';
import { api } from '../utils/api';

export default function BusinessHealthCenter({
  client,
  invoices,
  filings,
  notices,
  systemLogs,
  activeTemplate,
  onSelectTab,
  onSwitchTemplate
}) {
  const [showLogs, setShowLogs] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (client && client.id) {
      setLoading(true);
      api.getClientHealth(client.id).then((res) => {
        if (res) {
          setHealthData(res);
        }
        setLoading(false);
      });
    }
  }, [client, invoices, filings, notices]);

  // Business Rules and descriptions based on template
  const templateMeta = {
    consultant: {
      title: "Consultant Schema",
      details: "Section 44ADA • Pays tax on 50% of gross billing. No paper bill retention required.",
      rate: "18% GST"
    },
    trader: {
      title: "Trader Schema",
      details: "Composition Scheme • Pays flat 1% tax on turnover. No input tax credit claimable.",
      rate: "1% GST"
    },
    educator: {
      title: "Educator Schema",
      details: "Regular Scheme • 18% GST rate with full input tax credit on teaching tools & software.",
      rate: "18% GST"
    }
  };

  const currentMeta = templateMeta[activeTemplate] || templateMeta.consultant;

  // Health Metrics Fallbacks
  const healthScore = healthData ? healthData.healthScore : client.health_score || 92;
  const healthLabel = healthScore >= 90 ? "Excellent" : healthScore >= 70 ? "Good" : "Needs Review";

  const nextBestActions = healthData ? healthData.nextBestActions : [
    { id: "act_01", title: "Upload 2 missing purchase bills to claim ₹4,500 tax savings.", priority: "High" },
    { id: "act_02", title: "Review and approve your May GSTR-3B return.", priority: "Medium" }
  ];

  const timeline = healthData ? healthData.timeline : [
    { id: "time_01", title: "May GSTR-1 Sales Return Filed", status: "Completed", date: "2026-05-25" },
    { id: "time_02", title: "GST ASMT-10 Scrutiny Notice Detected", status: "Action Needed", date: "2026-06-04" },
    { id: "time_03", title: "May GSTR-3B Draft return ready", status: "Draft", date: "2026-06-20" }
  ];

  // Dynamic values
  const grossSalesVal = invoices
    .filter(i => i.type === 'Sales')
    .reduce((sum, i) => sum + i.taxableValue, 0) || 150000;
  
  const totalItcVal = invoices
    .filter(i => i.type === 'Purchase' && i.itcEligible)
    .reduce((sum, i) => sum + (i.cgst + i.sgst + i.igst), 0) || 3600;

  const presumptiveSavingsVal = activeTemplate === 'trader' ? (grossSalesVal * 0.99) : (grossSalesVal * 0.50);
  const netGstPayableVal = Math.max(0, (grossSalesVal * 0.18) - totalItcVal);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '24px',
      height: '100%',
      overflowY: 'auto',
      background: '#090a10',
      fontFamily: 'var(--font-main)',
      color: '#fff'
    }}>
      
      {/* 1. Header Greeting & Organization Details */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingBottom: '16px'
      }}>
        <div>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '20px', fontFamily: 'var(--font-heading)', color: '#fff' }}>
            Good Day, {client.legalName ? client.legalName.split(' ')[0] : 'Merchant'} Ji! ☕
          </h1>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
            GSTIN: <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{client.gstin || 'Not Registered'}</span> | State: {client.state || 'India'}
          </p>
        </div>
        
        {/* Simplified Premium Template Switcher */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          {Object.keys(templateMeta).map((key) => (
            <button
              key={key}
              onClick={() => onSwitchTemplate(key)}
              style={{
                background: activeTemplate === key ? 'rgba(13, 148, 136, 0.12)' : 'transparent',
                border: 'none',
                color: activeTemplate === key ? 'var(--accent)' : 'var(--text-secondary)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Simplified Health Center Layout (Dual Panel) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        
        {/* Left Panel: Health Score Indicator */}
        <div style={{
          flex: '1 1 300px',
          background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.05) 0%, rgba(9, 10, 16, 0.2) 100%)',
          border: '1px solid rgba(13, 148, 136, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          textAlign: 'center',
          position: 'relative'
        }}>
          {loading && (
            <div style={{ position: 'absolute', right: '12px', top: '12px' }}>
              <Loader2 size={14} className="spin-accent" />
            </div>
          )}
          
          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent)' }}>
            Compliance Health Score
          </span>
          
          {/* Health Score circle meter */}
          <div style={{
            position: 'relative',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: `conic-gradient(var(--accent) ${healthScore}%, rgba(255,255,255,0.05) 0)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(13, 148, 136, 0.1)'
          }}>
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: '#090a10',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '32px', fontWeight: '800', color: '#fff', fontFamily: 'monospace' }}>
                {healthScore}%
              </span>
              <span style={{ 
                fontSize: '10px', 
                color: healthScore >= 90 ? '#10b981' : healthScore >= 70 ? '#d97706' : '#ef4444', 
                fontWeight: '700', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '3px' 
              }}>
                <ShieldCheck size={11} /> {healthLabel}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '240px' }}>
            {healthScore >= 90 
              ? "Your compliance rating is outstanding. Keep up the timely e-filings."
              : "Action required. Resolve the highlighted tasks below to restore full compliance."}
          </div>
        </div>

        {/* Right Panel: Presumptive Tax Stats */}
        <div style={{
          flex: '2 1 400px',
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-primary)' }}>Active Tax Optimization Config</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '700' }}>
                {client.scheme || 'Presumptive Scheme'}
              </span>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--accent)', fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <strong>{currentMeta.title}:</strong> {currentMeta.details}
            </div>
          </div>

          {/* Simple Tax projections data */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
            <div>
              <span style={{ fontSize: '9px', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Gross Sales</span>
              <span style={{ fontSize: '16px', fontWeight: '800', marginTop: '4px', display: 'block' }}>₹{grossSalesVal.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span style={{ fontSize: '9px', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Presumptive Savings</span>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#10b981', marginTop: '4px', display: 'block' }}>₹{presumptiveSavingsVal.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span style={{ fontSize: '9px', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Est. Net GST</span>
              <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--accent)', marginTop: '4px', display: 'block' }}>₹{netGstPayableVal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Ranked Next Best Action Engine */}
      <div style={{
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={16} color="var(--accent)" /> Ranked Next Best Actions (Your Directions)
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {nextBestActions.map((action, index) => {
            const isHigh = action.priority === 'High';
            const isMedium = action.priority === 'Medium';
            const iconBg = isHigh ? 'rgba(239, 68, 68, 0.1)' : isMedium ? 'rgba(217, 119, 6, 0.1)' : 'rgba(13, 148, 136, 0.1)';
            const iconColor = isHigh ? '#ef4444' : isMedium ? '#d97706' : 'var(--accent)';
            const tabTarget = isHigh ? 'analytics' : isMedium ? 'caretaker' : 'onboarding';
            
            return (
              <div key={action.id || index} style={{
                background: isHigh ? 'rgba(239, 68, 68, 0.01)' : 'rgba(255,255,255,0.02)',
                border: isHigh ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => onSelectTab(tabTarget)}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = iconColor}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = isHigh ? 'rgba(239, 68, 68, 0.2)' : 'var(--border-color)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isHigh ? <AlertTriangle size={11} /> : isMedium ? <Clock size={11} /> : <FileText size={11} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: isHigh ? '#ef4444' : 'var(--text-primary)' }}>{action.title}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {isHigh ? "Critical notice reply compilation required." : isMedium ? "Complied CA draft review required." : "Compliance optimizations recommendation."}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: iconColor, fontWeight: '700' }}>
                  Resolve <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Visual Compliance Timeline */}
      <div style={{
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={16} color="var(--accent)" /> Visual Compliance Timeline
        </h3>
        
        {/* Timeline container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative', paddingLeft: '24px' }}>
          {/* Vertical line connector */}
          <div style={{ position: 'absolute', left: '7px', top: '4px', bottom: '4px', width: '2px', background: 'rgba(255,255,255,0.05)' }}></div>
          
          {timeline.map((item, index) => {
            const isCompleted = item.status === 'Completed';
            const isAction = item.status === 'Action Needed';
            const markerBg = isCompleted ? '#10b981' : isAction ? '#ef4444' : 'var(--accent)';
            
            return (
              <div key={item.id || index} style={{ position: 'relative', paddingBottom: index === timeline.length - 1 ? '0' : '20px' }}>
                <div style={{ 
                  position: 'absolute', 
                  left: '-23px', 
                  top: '2px', 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  background: markerBg, 
                  border: '3px solid #090a10', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}></div>
                <div style={{ fontSize: '11.5px', fontWeight: '700', color: isAction ? '#ef4444' : isCompleted ? 'var(--text-primary)' : 'var(--accent)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Target/Filing Date: {item.date} • Status: {item.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Collapsible FastAPI Developer Telemetry Logs */}
      <div style={{
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setShowLogs(!showLogs)}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: 'none',
            color: 'var(--text-primary)',
            width: '100%',
            padding: '16px 24px',
            fontSize: '11.5px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            outline: 'none'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={13} color="var(--accent)" /> FastAPI Core Developer Telemetry Logs
          </span>
          {showLogs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showLogs && (
          <div style={{
            padding: '20px',
            background: '#040508',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            maxHeight: '200px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontFamily: 'monospace',
            fontSize: '10px',
            textAlign: 'left'
          }}>
            {systemLogs.map((log) => (
              <div key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.01)', paddingBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>[{log.time}]</span>{' '}
                <span style={{
                  color: log.type === 'ocr' ? '#0d9488' : log.type === 'ca' ? '#a78bfa' : log.type === 'notice' ? '#ef4444' : '#60a5fa',
                  fontWeight: '700',
                  textTransform: 'uppercase'
                }}>[{log.type}]</span>{' '}
                <span style={{ color: '#8892b0' }}>{log.msg}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
