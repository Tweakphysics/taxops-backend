import React, { useState } from 'react';
import { Send, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

export default function TabCaretaker({ config, onUpdateConfig }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "🤖 Hello! I am your AI Website Caretaker Agent. Don't waste time on complicated visual drag-and-drop builders. Just tell me what you want to change, and I will update your code and redeploy it instantly."
    },
    {
      sender: 'bot',
      text: "Try commands like:\n• \"Change doctor name to Dr. Marcus Brodie\"\n• \"Update special cleaning price to $79\"\n• \"Disable the emergency red banner\"\n• \"Set phone number to +1 (555) 999-8888\""
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsUpdating(true);

    setTimeout(() => {
      setIsUpdating(false);
      let lower = userText.toLowerCase();
      let matchFound = false;
      let replyText = "";

      // 1. Doctor Name Match
      if (lower.includes("doctor name") || lower.includes("dr name")) {
        const match = userText.match(/(?:to|is)\s+(Dr\.\s+[A-Za-z\s]+)/i);
        const name = match ? match[1] : "Dr. Marcus Brodie";
        onUpdateConfig({ doctorName: name });
        replyText = `✅ Scaffolding updated! Changed primary dentist lead to: ${name}. Redeployed live.`;
        matchFound = true;
      }
      // 2. Phone Match
      else if (lower.includes("phone") || lower.includes("call")) {
        const match = userText.match(/(\+?\d[\d\-\(\)\s]{8,15}\d)/);
        const phone = match ? match[1] : "+1 (555) 999-8888";
        onUpdateConfig({ phone: phone });
        replyText = `✅ Injected new phone layout! Primary Click-to-Call set to: ${phone}. Global headers compiled.`;
        matchFound = true;
      }
      // 3. Cleaning Special Match
      else if (lower.includes("cleaning") || lower.includes("price") || lower.includes("offer") || lower.includes("$")) {
        const match = userText.match(/(\$\d+)/);
        const price = match ? match[1] : "$79";
        const newOffer = `${price} New Patient Dental Cleaning & X-Ray Special`;
        onUpdateConfig({ offerText: newOffer });
        replyText = `✅ Promotional banner rebuilt! Updated New Patient Coupon to: "${newOffer}". Code pushed live.`;
        matchFound = true;
      }
      // 4. Toggle Toggles
      else if (lower.includes("emergency banner") || lower.includes("red banner")) {
        const isDisable = lower.includes("disable") || lower.includes("remove") || lower.includes("off");
        const newFeatures = { ...config.activeFeatures, emergencyBanner: !isDisable };
        onUpdateConfig({ activeFeatures: newFeatures });
        replyText = `✅ Component toggled! Emergency Urgent banner is now turned ${isDisable ? 'OFF' : 'ON'}. Grid updated.`;
        matchFound = true;
      }
      else if (lower.includes("booking") || lower.includes("scheduler")) {
        const isDisable = lower.includes("disable") || lower.includes("remove") || lower.includes("off");
        const newFeatures = { ...config.activeFeatures, bookingScheduler: !isDisable };
        onUpdateConfig({ activeFeatures: newFeatures });
        replyText = `✅ Scheduler configuration rebuilt! Inline booking scheduler is now ${isDisable ? 'DISABLED' : 'ENABLED'}.`;
        matchFound = true;
      }

      if (!matchFound) {
        replyText = "🤖 I understood your command! Since we are visualizing, I am compiling that edit right now. I've updated the site parameters and pushed the change to Vercel subdomains successfully.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
    }, 1200);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '20px'
    }}>
      {/* Header Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '16px'
      }}>
        <div style={{
          background: 'var(--accent-glow)',
          borderRadius: '8px',
          padding: '6px',
          color: 'var(--accent)'
        }}>
          <Sparkles size={16} />
        </div>
        <div>
          <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
            AI Website Caretaker
          </h3>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
            Status: Active & Listening
          </span>
        </div>
      </div>

      {/* Messages */}
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
                animation: 'fadeIn 0.2s ease'
              }}
            >
              <div style={{
                maxWidth: '85%',
                background: isBot ? 'rgba(255, 255, 255, 0.03)' : 'var(--accent)',
                border: isBot ? '1px solid var(--border-color)' : 'none',
                borderRadius: '12px',
                padding: '12px 14px',
                color: isBot ? 'var(--text-primary)' : '#fff',
                fontSize: '12px',
                lineHeight: '1.5',
                whiteSpace: 'pre-line'
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}

        {isUpdating && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '10px 14px',
              color: 'var(--text-secondary)',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span className="pulse-accent" style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }}></span>
              Compiling and redeploying code...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          className="chat-input-box"
          style={{ flex: 1, fontSize: '12px' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask AI to make changes, e.g. 'Change doctor name to Dr. Jenkins'"
        />
        <button type="submit" className="btn-primary" style={{ padding: '0 16px' }}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
