import React, { useState } from 'react';
import { Phone, Calendar, Clock, MapPin, Award, CheckCircle, ShieldAlert, Star, ChevronDown, Sparkles } from 'lucide-react';

export default function DentistTemplate({ config }) {
  const {
    clinicName = "Smile Craft Dental Clinic",
    doctorName = "Dr. Sarah Jenkins",
    phone = "+1 (555) 123-4567",
    address = "104 Medical Plaza, Dallas, TX",
    hours = "Mon - Fri: 8:00 AM - 5:00 PM",
    themeColor = "teal", // teal, blue, green, gold
    activeLogoId = "logo-1",
    activeFeatures = {},
    offerText = "$99 New Patient Dental Cleaning & X-Ray Special",
    googleReviews = [
      { author: "Rachel Green", rating: 5, text: "Absolutely loved the staff! Dr. Sarah was incredibly gentle during my veneer procedure. The office is beautiful." },
      { author: "Michael Scott", rating: 5, text: "Fastest root canal I've ever had. Literally felt zero pain. Will recommend to all my friends." }
    ],
    services = [
      { title: "Cosmetic Veneers", desc: "Craft your dream smile with custom porcelain or composite sheets.", cost: "$999/tooth" },
      { title: "Dental Implants", desc: "Premium tooth restoration using state-of-the-art permanent titanium screws.", cost: "$2,499" },
      { title: "Professional Whitening", desc: "Safe, rapid laser bleaching system. Lighten your smile up to 8 shades in 45 mins.", cost: "$299" },
      { title: "Emergency Care", desc: "24/7 urgent dental treatments for toothaches, breakages, or severe swellings.", cost: "Priority Triage" }
    ]
  } = config;

  const [activeFaq, setActiveFaq] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingService, setBookingService] = useState('General Cleaning');

  // HSL Color Palette Definitions based on configuration
  const themeStyles = {
    teal: { h: 174, s: '75%', l: '40%', name: 'Teal' },
    blue: { h: 217, s: '89%', l: '50%', name: 'Royal Blue' },
    green: { h: 142, s: '70%', l: '35%', name: 'Mint Green' },
    gold: { h: 42, s: '85%', l: '45%', name: 'Luxury Gold' }
  };

  const selectedTheme = themeStyles[themeColor] || themeStyles.teal;
  const accentHsl = `${selectedTheme.h}, ${selectedTheme.s}, ${selectedTheme.l}`;
  const accentColor = `hsl(${accentHsl})`;

  // SVGs for the selected logo inside header
  const renderLogoIcon = () => {
    switch (activeLogoId) {
      case 'logo-1':
        return (
          <svg viewBox="0 0 100 100" width="34" height="34">
            <path d="M 50 15 C 32 15, 22 28, 22 45 C 22 62, 35 75, 38 88 C 41 85, 45 80, 50 80 C 55 80, 59 85, 62 88 C 65 75, 78 62, 78 45 C 78 28, 68 15, 50 15 Z" fill="none" stroke={accentColor} strokeWidth="8" />
          </svg>
        );
      case 'logo-2':
        return (
          <svg viewBox="0 0 100 100" width="34" height="34">
            <path d="M 20 50 Q 50 85, 80 50 Q 50 68, 20 50 Z" fill={accentColor} />
          </svg>
        );
      case 'logo-3':
        return (
          <svg viewBox="0 0 100 100" width="34" height="34">
            <rect x="42" y="20" width="16" height="60" rx="8" fill={accentColor} opacity="0.4" />
            <rect x="20" y="42" width="60" height="16" rx="8" fill={accentColor} opacity="0.4" />
            <path d="M 30 70 Q 50 35, 70 30 Q 55 55, 30 70 Z" fill="none" stroke={accentColor} strokeWidth="8" />
          </svg>
        );
      case 'logo-4':
        return (
          <svg viewBox="0 0 100 100" width="34" height="34">
            <path d="M 50 15 L 54 38 L 77 42 L 54 46 L 50 69 L 46 46 L 23 42 L 46 38 Z" fill={accentColor} />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookedSuccess(true);
    setTimeout(() => {
      // Simulate adding to CRM state (we'll communicate this back via App.jsx callbacks if needed)
      if (config.onNewLead) {
        config.onNewLead({
          name: bookingName || "John Doe",
          phone: bookingPhone || "+1 (555) 999-9999",
          service: bookingService,
          date: new Date().toISOString().split('T')[0]
        });
      }
      setShowBookingModal(false);
      setBookedSuccess(false);
      setBookingName('');
      setBookingPhone('');
    }, 1500);
  };

  return (
    <div className="dentist-template-root" style={{
      background: '#ffffff',
      color: '#1f2937',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      lineHeight: '1.6',
      height: '100%',
      overflowY: 'auto',
      position: 'relative'
    }}>
      {/* 1. Sticky Nav Bar */}
      {activeFeatures.stickyNav && (
        <header style={{
          position: 'sticky',
          top: 0,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e5e7eb',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {renderLogoIcon()}
            <span style={{ 
              fontWeight: 800, 
              fontSize: '16px', 
              color: '#111827', 
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '-0.5px' 
            }}>
              {clinicName}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href={`tel:${phone}`} style={{ 
              color: '#374151', 
              textDecoration: 'none', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px'
            }}>
              <Phone size={14} color={accentColor} />
              {phone}
            </a>
            {activeFeatures.bookingScheduler && (
              <button 
                onClick={() => setShowBookingModal(true)}
                style={{
                  background: accentColor,
                  color: '#fff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Book Appointment
              </button>
            )}
          </div>
        </header>
      )}

      {/* 2. Urgent Emergency Banner */}
      {activeFeatures.emergencyBanner && (
        <div style={{
          background: '#fee2e2',
          borderBottom: '1px solid #fca5a5',
          color: '#991b1b',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShieldAlert size={14} />
          <span>Severe Dental Pain? 24/7 Priority Emergency Triage Call Now: </span>
          <a href={`tel:${phone}`} style={{ color: '#b91c1c', textDecoration: 'underline' }}>{phone}</a>
        </div>
      )}

      {/* 3. Hero Section */}
      {activeFeatures.heroBanner && (
        <section style={{
          background: `linear-gradient(135deg, rgba(${accentHsl}, 0.04) 0%, rgba(${accentHsl}, 0.08) 100%)`,
          padding: '60px 24px',
          textAlign: 'center',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#fff',
              border: `1px solid rgba(${accentHsl}, 0.15)`,
              borderRadius: '99px',
              padding: '4px 12px',
              color: accentColor,
              fontWeight: '700',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}>
              <Sparkles size={11} /> Top Rated Local Family Dentist
            </div>
            
            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '32px',
              lineHeight: 1.2,
              color: '#111827',
              marginBottom: '16px',
              letterSpacing: '-1px'
            }}>
              Gentle, Premium Dental Care for a Happy Lifetime Smile
            </h1>
            
            <p style={{ color: '#4b5563', fontSize: '15px', marginBottom: '24px' }}>
              Welcome to <strong>{clinicName}</strong> led by <strong>{doctorName}</strong>. We offer custom cosmetic scans, dental implants, laser whitening, and family care in a safe, luxury clinical setting.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              {activeFeatures.bookingScheduler && (
                <button 
                  onClick={() => setShowBookingModal(true)}
                  style={{
                    background: accentColor,
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: `0 4px 15px rgba(${accentHsl}, 0.2)`
                  }}
                >
                  Request Appointment
                </button>
              )}
              <a 
                href={`tel:${phone}`}
                style={{
                  background: '#fff',
                  border: '1px solid #d1d5db',
                  color: '#374151',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '14px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 4. Special New Patient Offer */}
      {activeFeatures.newPatientOffer && (
        <section style={{
          background: accentColor,
          color: '#fff',
          padding: '20px 24px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              marginRight: '8px'
            }}>
              Limited Offer
            </span>
            <strong style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px' }}>{offerText}</strong>
            <button 
              onClick={() => setShowBookingModal(true)}
              style={{
                marginLeft: '12px',
                background: '#fff',
                color: accentColor,
                border: 'none',
                padding: '4px 12px',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Claim Coupon
            </button>
          </div>
        </section>
      )}

      {/* 5. Services Grid */}
      {activeFeatures.servicesGrid && (
        <section style={{ padding: '40px 24px' }}>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '22px',
            fontWeight: 800,
            textAlign: 'center',
            color: '#111827',
            marginBottom: '6px'
          }}>
            Our Dental Treatments
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginBottom: '24px' }}>
            State-of-the-art procedures to maximize your oral hygiene and smile aesthetics.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {services.map((srv, idx) => (
              <div 
                key={idx}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '16px',
                  transition: 'all 0.2s ease',
                  background: '#fafafa'
                }}
              >
                <div style={{
                  color: accentColor,
                  fontWeight: '700',
                  fontSize: '15px',
                  marginBottom: '6px',
                  fontFamily: 'Outfit, sans-serif'
                }}>
                  {srv.title}
                </div>
                <p style={{ fontSize: '12px', color: '#4b5563', marginBottom: '12px' }}>
                  {srv.desc}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '8px'
                }}>
                  <span style={{ color: '#9ca3af' }}>Est. Cost:</span>
                  <span style={{ fontWeight: '700', color: '#111827' }}>{srv.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Meet The Doctor */}
      {activeFeatures.meetDoctor && (
        <section style={{
          background: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb',
          padding: '40px 24px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${accentColor} 0%, rgba(${accentHsl}, 0.5) 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '28px',
              fontWeight: '800',
              fontFamily: 'Outfit, sans-serif',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}>
              {doctorName.split(' ')[1]?.charAt(0) || 'D'}
            </div>

            <div>
              <h3 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '20px',
                fontWeight: 800,
                color: '#111827',
                marginBottom: '4px'
              }}>
                {doctorName}
              </h3>
              <span style={{
                fontSize: '12px',
                fontWeight: '700',
                color: accentColor,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'block',
                marginBottom: '12px'
              }}>
                Lead Cosmetic Surgeon & Dentist
              </span>
              <p style={{ color: '#4b5563', fontSize: '13px', lineHeight: '1.6' }}>
                With over 14 years of clinical experience, {doctorName} specializes in implantology and veneer smile design. Dedicated to helping families overcome dental fear through friendly, pain-free sedation care.
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '16px',
                fontSize: '11px',
                color: '#6b7280'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={14} color={accentColor} /> ADA Certified
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle size={14} color={accentColor} /> 100% Pain-freeSedation
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Patient Google Reviews Slider */}
      {activeFeatures.googleReviews && (
        <section style={{ padding: '40px 24px', background: '#fff' }}>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '22px',
            fontWeight: 800,
            textAlign: 'center',
            color: '#111827',
            marginBottom: '6px'
          }}>
            Real Patient Success Stories
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            color: '#fbbf24',
            marginBottom: '20px'
          }}>
            <Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" />
            <span style={{ fontSize: '12px', color: '#4b5563', marginLeft: '6px', fontWeight: '600' }}>
              4.9/5 stars based on 130+ Google reviews
            </span>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {googleReviews.map((rev, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '16px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{rev.author}</strong>
                  <div style={{ display: 'flex', gap: '2px', color: '#fbbf24' }}>
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={11} fill="#fbbf24" />)}
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: '#4b5563', italic: 'true' }}>
                  "{rev.text}"
                </p>
                <div style={{
                  fontSize: '9px',
                  color: '#10b981',
                  marginTop: '8px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle size={10} /> Verified Patient Review
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Treatment FAQ Accordion */}
      {activeFeatures.treatmentFaq && (
        <section style={{
          padding: '40px 24px',
          background: '#f9fafb',
          borderTop: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '22px',
            fontWeight: 800,
            textAlign: 'center',
            color: '#111827',
            marginBottom: '24px'
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {[
              { q: "Is the first consultation covered by insurance?", a: "Yes, we accept major dental PPO insurance plans. Most diagnostic appointments and cleanings are covered at 100% with no copays." },
              { q: "Do you offer sedation options for nervous patients?", a: "Absolutely. We offer sedation options including nitrous oxide (laughing gas) and oral conscious sedation to ensure a completely calm, painless visit." },
              { q: "What should I do in a dental emergency?", a: "Call our primary number immediately. We hold priority emergency slots open every day to treat severe tooth pain, chips, or infections instantly." }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontWeight: '600',
                      fontSize: '13px',
                      color: '#111827',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: accentColor
                    }} />
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 16px 16px 16px',
                      fontSize: '12px',
                      color: '#4b5563',
                      borderTop: '1px solid #f3f4f6',
                      paddingTop: '12px'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 9. Contact Info & Hours */}
      {activeFeatures.contactSection && (
        <section style={{ padding: '40px 24px', background: '#fff', borderTop: '1px solid #e5e7eb' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div>
              <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '15px', color: '#111827', marginBottom: '12px' }}>
                Visit Our Office
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', color: '#4b5563' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color={accentColor} /> {address}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color={accentColor} /> {phone}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color={accentColor} /> {hours}
                </span>
              </div>
            </div>

            <div>
              <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '15px', color: '#111827', marginBottom: '12px' }}>
                Quick Map Navigation
              </h4>
              <div style={{
                height: '110px',
                borderRadius: '8px',
                background: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                color: '#6b7280',
                fontWeight: '600',
                border: '1px solid #d1d5db',
                backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}>
                Google Maps Embed Placeholder
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 10. Footer with Credentials */}
      <footer style={{
        background: '#111827',
        color: '#9ca3af',
        padding: '30px 24px',
        textAlign: 'center',
        fontSize: '11px',
        borderTop: '1px solid #1f2937'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ marginBottom: '8px', color: '#fff', fontWeight: '600', fontSize: '12px' }}>
            {clinicName}
          </p>
          <p style={{ marginBottom: '12px' }}>
            © {new Date().getFullYear()} {clinicName}. All rights reserved. Managed by AI Business Suite.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', color: '#6b7280' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <span>|</span>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            <span>|</span>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>ADA Compliance</a>
          </div>
        </div>
      </footer>

      {/* Booking Form Dialog Modal */}
      {showBookingModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '16px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            width: '100%',
            maxWidth: '380px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <h3 style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '18px',
              color: '#111827',
              marginBottom: '4px'
            }}>
              Book an Appointment
            </h3>
            <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '16px' }}>
              Fill in your details below and we will confirm your calendar slot.
            </p>

            {bookedSuccess ? (
              <div style={{
                textAlign: 'center',
                padding: '20px 0',
                color: '#10b981',
                fontWeight: '600',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={32} />
                <span>Appointment Requested!</span>
                <span style={{ fontSize: '10px', color: '#6b7280' }}>Adding to lead system...</span>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="e.g. Eleanor Vance" 
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    required 
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 234-5678" 
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Treatment Needed
                  </label>
                  <select 
                    value={bookingService}
                    onChange={(e) => setBookingService(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '12px',
                      background: '#fff'
                    }}
                  >
                    <option>General Cleaning & Checkup</option>
                    <option>Cosmetic Veneers</option>
                    <option>Dental Implants</option>
                    <option>Laser Whitening</option>
                    <option>Emergency Root Canal</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button 
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    style={{
                      flex: 1,
                      background: '#f3f4f6',
                      color: '#4b5563',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    style={{
                      flex: 1.5,
                      background: accentColor,
                      color: '#fff',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
