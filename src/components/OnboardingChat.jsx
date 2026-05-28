import React, { useState, useEffect } from 'react';
import { Send, MapPin, CheckCircle, Sparkles, Wand2 } from 'lucide-react';
import LogoGenerator from './LogoGenerator';

export default function OnboardingChat({ config, onUpdateConfig, onLaunchPortal }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Welcome to LocalOS! I am your AI Agent Setup Assistant. Let's launch your premium business website and customized CRM in under a minute."
    },
    {
      sender: 'bot',
      text: "First: What is the name of your dental practice or business clinic?"
    }
  ]);
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const addBotMessage = (text, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text }]);
    }, delay);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');

    if (step === 1) {
      // Clinic Name submitted
      onUpdateConfig({ clinicName: userText });
      setStep(2);
      addBotMessage(`Wow, "${userText}" sounds beautiful and highly professional!`);
      addBotMessage("Step 2: Do you have a Google Maps URL for your clinic? Paste it below, and I'll call our Scraper Agent to automatically pull your address, opening hours, phone number, and real 5-star patient reviews.");
    } else if (step === 2) {
      // Google Maps URL submitted
      triggerSimulatedScrape(userText);
    }
  };

  const triggerSimulatedScrape = (urlInput = "") => {
    setStep(3);
    setMessages(prev => [...prev, { sender: 'bot', text: "⚙️ Calling Scraper Agent... Parsing Google Maps local listing details." }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      // Update config with mock scraped data
      onUpdateConfig({
        phone: "+1 (555) 789-2345",
        address: "405 Wellness Blvd, Suite B, Austin, TX",
        hours: "Mon - Sat: 8:30 AM - 6:00 PM",
        activeFeatures: {
          stickyNav: true,
          heroBanner: true,
          servicesGrid: true,
          meetDoctor: true,
          googleReviews: true,
          bookingScheduler: true,
          treatmentFaq: true,
          contactSection: true,
          emergencyBanner: true,
          newPatientOffer: true
        }
      });
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "✅ Extraction Successful! I've loaded your phone (+1 (555) 789-2345), address (Austin, TX), and pulled 2 glowing 5-star Google patient reviews!"
        },
        {
          sender: 'bot',
          text: "Step 3: If you don't have a logo, my designer tool has dynamically generated 4 modern SVG vector dental logos matching your practice name. Pick your favorite below and select your corporate accent color:"
        }
      ]);
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '24px'
    }}>
      {/* Dynamic Floating sparkles header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '16px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)'
        }}>
          <Sparkles size={16} className="pulse-accent" />
        </div>
        <div>
          <h2 style={{ fontSize: '15px', fontFamily: 'var(--font-heading)', fontWeight: '700' }}>
            Conversational Setup Assistant
          </h2>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
            Agent Onboarding Flow
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        paddingRight: '6px',
        marginBottom: '16px'
      }}>
        {messages.map((msg, idx) => {
          const isBot = msg.sender === 'bot';
          return (
            <div 
              key={idx}
              style={{
                display: 'flex',
                justifyContent: isBot ? 'flex-start' : 'flex-end',
                animation: 'fadeIn 0.25s ease'
              }}
            >
              <div style={{
                maxWidth: '85%',
                background: isBot ? 'rgba(255, 255, 255, 0.03)' : 'var(--accent)',
                border: isBot ? '1px solid var(--border-color)' : 'none',
                borderRadius: '12px',
                padding: '12px 16px',
                color: isBot ? 'var(--text-primary)' : '#fff',
                fontSize: '12.5px',
                lineHeight: '1.5'
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '10px 16px',
              color: 'var(--text-secondary)',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span className="pulse-accent" style={{ width: '4px', height: '4px', background: 'var(--text-secondary)', borderRadius: '50%' }}></span>
              AI Agent is crafting response...
            </div>
          </div>
        )}

        {/* Step 3: Inline Logo Selection & Accent Color */}
        {step >= 3 && !isTyping && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '16px',
            marginTop: '8px',
            animation: 'fadeIn 0.4s ease'
          }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Dynamic SVG Logo Options:
            </h4>
            
            <LogoGenerator 
              clinicName={config.clinicName}
              activeLogoId={config.activeLogoId}
              onSelectLogo={(id) => onUpdateConfig({ activeLogoId: id })}
            />

            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>
              Select Core Theme Color:
            </h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'teal', color: '#0d9488', name: 'Teal' },
                { id: 'blue', color: '#2563eb', name: 'Blue' },
                { id: 'green', color: '#16a34a', name: 'Green' },
                { id: 'gold', color: '#d97706', name: 'Gold' }
              ].map((theme) => {
                const isActive = config.themeColor === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onUpdateConfig({ themeColor: theme.id })}
                    style={{
                      background: theme.color,
                      border: isActive ? '3px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 0 10px rgba(255,255,255,0.3)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {theme.name}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onLaunchPortal}
              style={{
                width: '100%',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: '700',
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                cursor: 'pointer',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px var(--accent-glow)'
              }}
            >
              <Wand2 size={16} />
              LAUNCH CLINIC PORTAL & SITE
            </button>
          </div>
        )}
      </div>

      {/* Input Controls */}
      {step < 3 && (
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            className="chat-input-box"
            style={{ flex: 1, fontSize: '12px' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={step === 1 ? "e.g. Dallas Smile Craft" : "Paste your Google Maps link or type 'skip'"}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0 16px' }}>
            <Send size={16} />
          </button>
          {step === 2 && (
            <button 
              type="button" 
              onClick={() => triggerSimulatedScrape()}
              style={{
                background: '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0 12px',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Wand2 size={12} /> Auto-Scrape Maps
            </button>
          )}
        </form>
      )}
    </div>
  );
}
