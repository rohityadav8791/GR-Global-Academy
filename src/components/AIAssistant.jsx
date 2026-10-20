import React, { useState, useEffect } from 'react';
import { schoolData } from '../data/schoolData';
import './styles/AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { contact, admissions, academics, facilities, principal, hero } = schoolData;

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: `Hello! I'm the GR Global Academy assistant. I can help parents with questions about admissions, school timings, facilities, fees, and more. How can I assist you today?`,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(msg)) {
      return `Hello! Welcome to Gr Global Academy. I'm here to help parents with any questions about our school. What would you like to know?`;
    }

    // Admissions
    if (/admission|enroll|enquiry|apply|registration/.test(msg)) {
      return `Admissions are open at Gr Global Academy! You can submit an admission enquiry through our form on this page. Our team will contact you with details about age criteria, required documents, fee structure, and the application process. Would you like me to guide you through the admission process?`;
    }

    // School timings / Office hours
    if (/timing|time|office hour|when|open|schedule/.test(msg)) {
      return `Our school office hours are ${contact.officeHours}. For specific class timings, please contact the school office at ${contact.phone}.`;
    }

    // Contact / Address / Location
    if (/contact|address|location|where|find|reach|phone|email/.test(msg)) {
      return `You can reach us at:\n📍 Address: ${contact.address}\n📞 Phone: ${contact.phone}\n✉️ Email: ${contact.email}\n🕒 Office Hours: ${contact.officeHours}\nWe're located near Fauji Building Material, Rupaspur Chauraha, Firozabad.`;
    }

    // Principal
    if (/principal|head|headmaster|headmistress/.test(msg)) {
      return `Our school Principal is ${principal.name}. ${principal.message.substring(0, 200)}...`;
    }

    // Facilities
    if (/facilit|infrastructure|classroom|library|lab|sport|transport|safety/.test(msg)) {
      const facilityList = facilities.map(f => `• ${f.title}`).join('\n');
      return `We offer the following facilities at Gr Global Academy:\n${facilityList}\n\nWould you like details about any specific facility?`;
    }

    // Academics / Classes / Grades
    if (/academic|class|grade|primary|middle|secondary|senior|curriculum|subject/.test(msg)) {
      const academicList = academics.map(a => `• ${a.title}`).join('\n');
      return `We offer the following academic programmes:\n${academicList}\n\nEach programme is designed to provide quality education appropriate for the age group.`;
    }

    // Fees
    if (/fee|fees|cost|payment|money|price|tuition/.test(msg)) {
      return `For detailed fee structure and payment information, please contact our admissions office at ${contact.phone} or email ${contact.email}. Our team will provide you with the complete fee details for your child's grade.`;
    }

    // Events
    if (/event|annual day|sports day|function|celebrat/.test(msg)) {
      return `We host various events throughout the year including Annual Day, Sports Day, Science Exhibition, Parent-Teacher Meetings, and Cultural Celebrations. Please check our News & Events section for upcoming dates.`;
    }

    // Gallery / Photos
    if (/gallery|photo|picture|image|campus|see school/.test(msg)) {
      return `You can view our school gallery with photos of campus, classrooms, laboratories, sports, and cultural events in the Gallery section of our website.`;
    }

    // Thank you / Bye
    if (/thank|thanks|bye|goodbye|see you/.test(msg)) {
      return `You're welcome! If you have any more questions about Gr Global Academy, feel free to ask. Have a great day!`;
    }

    // Default
    return `I'm here to help with information about Gr Global Academy. You can ask me about admissions, school timings, location, facilities, academics, events, or contact details. For specific enquiries, please use our Admission Enquiry form or contact us at ${contact.phone}.`;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botText = getBotResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: botText,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        className={`ai-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        {isOpen ? '✕' : '💬'}
        <span className="ai-toggle-label">{isOpen ? 'Close' : 'Ask Assistant'}</span>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="ai-chat-container">
          <div className="ai-chat-header">
            <div className="ai-header-info">
              <div className="ai-logo">GA</div>
              <div>
                <div className="ai-title">Gr Global Academy</div>
                <div className="ai-subtitle">Assistant</div>
              </div>
            </div>
            <button className="ai-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="ai-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-message ${msg.type}`}
              >
                <div className="ai-message-content">
                  {msg.type === 'bot' && (
                    <div className="ai-bot-avatar">GA</div>
                  )}
                  <div className="ai-message-text">{msg.text}</div>
                  <div className="ai-message-time">{formatTime(msg.timestamp)}</div>
                </div>
                {msg.type === 'user' && (
                  <div className="ai-user-avatar">U</div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="ai-message bot">
                <div className="ai-message-content">
                  <div className="ai-bot-avatar">GA</div>
                  <div className="ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ai-input-area">
            <form onSubmit={handleSend} className="ai-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="ai-input"
                autoComplete="off"
              />
              <button type="submit" className="ai-send">
                ↑
              </button>
            </form>
          </div>

          <div className="ai-disclaimer">
            AI assistant provides general information. For official enquiries, contact the school office.
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
