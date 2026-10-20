import React from 'react';
import { schoolData } from '../data/schoolData';
import './styles/Contact.css';

const API_BASE = schoolData.api?.baseUrl || '';
const ENQUIRY_ENDPOINT = schoolData.api?.enquiryEndpoint || '/api/admission-enquiry';

const ContactSection = () => {
  const { contact, maps } = schoolData;
  const [formStatus, setFormStatus] = React.useState(null);
  const [serverMessage, setServerMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setServerMessage('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Client-side validation
    const requiredFields = contact.formFields.filter(f => f.required).map(f => f.name);
    const missing = requiredFields.filter(name => !data[name] || String(data[name]).trim() === '');

    if (missing.length > 0) {
      setFormStatus('error');
      setServerMessage('Please fill in all required fields.');
      return;
    }

    // Phone number format check
    const phone = String(data.contactNumber || '').trim();
    if (!/^[\d\s\-\+\(\)]{10,}$/.test(phone)) {
      setFormStatus('error');
      setServerMessage('Please enter a valid contact number.');
      return;
    }

    // Email format check
    const emailVal = String(data.email || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setFormStatus('error');
      setServerMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}${ENQUIRY_ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: data.name,
          parentName: data.name,
          contactNumber: phone,
          email: emailVal,
          classOfInterest: data.subject || 'General Enquiry',
          message: data.message || '',
          _honeypot: '',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormStatus('error');
        setServerMessage(result.error || 'Failed to send message. Please try again.');
        return;
      }

      setFormStatus('success');
      setServerMessage(result.message || 'Your message has been sent successfully.');
      e.target.reset();
    } catch (err) {
      setFormStatus('error');
      setServerMessage('Network error. Please check your connection and try again.');
      console.error('Contact form error:', err);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Contact Us</span>
          <h2>{contact.heading}</h2>
          <div className="accent-bar"></div>
          <p>{contact.subheadline}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item card">
              <div className="contact-icon">L</div>
              <h3>School Address</h3>
              <p>{contact.address}</p>
            </div>
            <div className="contact-item card">
              <div className="contact-icon">P</div>
              <h3>Phone Number</h3>
              <p>{contact.phone}</p>
            </div>
            <div className="contact-item card">
              <div className="contact-icon">E</div>
              <h3>Official Email</h3>
              <p>{contact.email}</p>
            </div>
            <div className="contact-item card">
              <div className="contact-icon">H</div>
              <h3>Office Hours</h3>
              <p>{contact.officeHours}</p>
            </div>
          </div>
          <div className="contact-map-form">
            <div className="map-wrapper card">
              <h3>Location</h3>
              <iframe
                className="map-iframe"
                src={maps.embedUrl}
                allowFullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gr Global Academy location - Rupaspur Chauraha, Firozabad"
              />
            </div>
            <div className="contact-form-wrapper card">
              <h3>Send us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {contact.formFields.map((field, index) => (
                  <div key={index} className="form-group">
                    <label htmlFor={field.name}>
                      {field.label} {field.required && <span className="required" aria-hidden="true">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        rows={field.rows}
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="btn btn-burgundy"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'success' && (
                  <p className="form-status success">{serverMessage}</p>
                )}
                {formStatus === 'error' && (
                  <p className="form-status error">{serverMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
