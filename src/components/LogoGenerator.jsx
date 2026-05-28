import React from 'react';

export default function LogoGenerator({ clinicName, activeLogoId, onSelectLogo, color = 'var(--accent)' }) {
  const logos = [
    {
      id: 'logo-1',
      name: 'Modern Tooth',
      svg: (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          {/* Stylized geometric tooth */}
          <path 
            d="M 50 15 C 32 15, 22 28, 22 45 C 22 62, 35 75, 38 88 C 41 85, 45 80, 50 80 C 55 80, 59 85, 62 88 C 65 75, 78 62, 78 45 C 78 28, 68 15, 50 15 Z" 
            fill="none" 
            stroke={color} 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M 38 45 C 43 38, 57 38, 62 45" 
            fill="none" 
            stroke={color} 
            strokeWidth="4" 
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      id: 'logo-2',
      name: 'Aesthetic Smile',
      svg: (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          {/* Aesthetic minimalist lip/smile curve with teeth hints */}
          <path 
            d="M 20 50 Q 50 85, 80 50 Q 50 68, 20 50 Z" 
            fill={color} 
            opacity="0.9"
          />
          <path 
            d="M 35 48 C 42 42, 58 42, 65 48" 
            fill="none" 
            stroke={color} 
            strokeWidth="5" 
            strokeLinecap="round"
          />
          <circle cx="20" cy="50" r="3" fill={color} />
          <circle cx="80" cy="50" r="3" fill={color} />
        </svg>
      )
    },
    {
      id: 'logo-3',
      name: 'Premium Crest',
      svg: (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          {/* Medical cross intersecting a dental leaf */}
          <rect x="42" y="20" width="16" height="60" rx="8" fill={color} opacity="0.4" />
          <rect x="20" y="42" width="60" height="16" rx="8" fill={color} opacity="0.4" />
          <path 
            d="M 30 70 Q 50 35, 70 30 Q 55 55, 30 70 Z" 
            fill="none" 
            stroke={color} 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <circle cx="70" cy="30" r="4" fill={color} />
        </svg>
      )
    },
    {
      id: 'logo-4',
      name: 'Hygiene Sparkle',
      svg: (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          {/* Minimal sparkles */}
          <path d="M 50 15 L 54 38 L 77 42 L 54 46 L 50 69 L 46 46 L 23 42 L 46 38 Z" fill={color} />
          <path d="M 75 60 L 77 71 L 88 73 L 77 75 L 75 86 L 73 75 L 62 73 L 73 71 Z" fill={color} opacity="0.6" />
          <circle cx="35" cy="65" r="4" fill={color} opacity="0.8" />
        </svg>
      )
    }
  ];

  const shortName = clinicName.split(' ')[0] || 'Clinic';

  return (
    <div className="logo-generator-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginTop: '10px'
    }}>
      {logos.map((logo) => {
        const isActive = activeLogoId === logo.id;
        return (
          <div 
            key={logo.id}
            onClick={() => onSelectLogo(logo.id)}
            style={{
              background: isActive ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.02)',
              border: isActive ? '2px solid var(--accent)' : '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            <div style={{ width: '48px', height: '48px', marginBottom: '8px' }}>
              {logo.svg}
            </div>
            <span style={{ 
              fontSize: '11px', 
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: isActive ? '600' : '400',
              fontFamily: 'var(--font-heading)'
            }}>
              {logo.name}
            </span>
            <div style={{
              marginTop: '4px',
              fontSize: '9px',
              color: color,
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {shortName}
            </div>
          </div>
        );
      })}
    </div>
  );
}
