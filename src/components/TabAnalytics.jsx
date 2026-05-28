import React from 'react';
import { Eye, Phone, CalendarCheck, TrendingUp, Sparkles } from 'lucide-react';
import { defaultAnalytics } from '../utils/mockLeadData';

export default function TabAnalytics() {
  const { views, clicks, conversions, trafficHistory } = defaultAnalytics;

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
          Simplified Business Performance
        </h3>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
          Real-time patient activity tracker
        </span>
      </div>

      {/* Metrics cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '16px',
          position: 'relative'
        }}>
          <div style={{ color: 'var(--accent)', marginBottom: '8px' }}>
            <Eye size={18} />
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>
            Unique Visitors
          </span>
          <strong style={{ fontSize: '20px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', display: 'block', margin: '4px 0' }}>
            {views}
          </strong>
          <span style={{ fontSize: '9px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <TrendingUp size={10} /> +12% this week
          </span>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ color: 'var(--accent)', marginBottom: '8px' }}>
            <Phone size={18} />
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>
            Click-To-Calls
          </span>
          <strong style={{ fontSize: '20px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', display: 'block', margin: '4px 0' }}>
            {clicks}
          </strong>
          <span style={{ fontSize: '9px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <TrendingUp size={10} /> +8% conversion
          </span>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ color: 'var(--accent)', marginBottom: '8px' }}>
            <CalendarCheck size={18} />
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>
            Bookings Converted
          </span>
          <strong style={{ fontSize: '20px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', display: 'block', margin: '4px 0' }}>
            {conversions}
          </strong>
          <span style={{ fontSize: '9px', color: 'var(--accent)', fontWeight: '600' }}>
            1.9% Avg Conv Rate
          </span>
        </div>
      </div>

      {/* Traffic Graph Visuals */}
      <div style={{
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '16px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', color: 'var(--text-primary)', marginBottom: '16px' }}>
          Weekly Patient Acquisition
        </h4>

        {/* Graphical Bars */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flex: 1,
          padding: '10px 20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {trafficHistory.map((history, idx) => {
            const pct = (history.count / 320) * 100;
            return (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  width: '30px'
                }}
              >
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{history.count}</span>
                <div style={{
                  width: '8px',
                  height: `${pct * 0.8}px`,
                  background: 'var(--accent)',
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.8 + (idx * 0.03),
                  boxShadow: '0 2px 8px var(--accent-glow)'
                }}></div>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: '600' }}>{history.date}</span>
              </div>
            );
          })}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,255,255,0.02)',
          padding: '10px',
          borderRadius: '8px',
          marginTop: '12px',
          fontSize: '10.5px',
          color: 'var(--text-secondary)'
        }}>
          <Sparkles size={14} color="var(--accent)" />
          <span>LocalOS AI Agent automatically optimizes Google Maps NAP schema cards in the background. Traffic grows continuously.</span>
        </div>
      </div>
    </div>
  );
}
