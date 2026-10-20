import React from 'react';
import { schoolData } from '../data/schoolData';
import './styles/Admissions.css';

const API_BASE = schoolData.api?.baseUrl || '';
const ENQUIRY_ENDPOINT = schoolData.api?.enquiryEndpoint || '/api/admission-enquiry';

const AdmissionsSection = () => {
  const { admissions } = schoolData;
  const [formStatus, setFormStatus] = React.useState(null); // null | 'sending' | 'success' | 'error'
  const [serverMessage, setServerMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setServerMessage('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Client-side validation (in addition to server-side)
    const requiredFields = admissions.formFields.filter(f => f.required).map(f => f.name);
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
          studentName: data.studentName,
          parentName: data.parentName,
          contactNumber: phone,
          email: emailVal,
          classOfInterest: data.classOfInterest,
          message: data.message || '',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormStatus('error');
        setServerMessage(result.error || 'Failed to send enquiry. Please try again.');
        return;
      }

      setFormStatus('success');
      setServerMessage(result.message || 'Your admission enquiry has been sent successfully.');
      e.target.reset();
    } catch (err) {
      setFormStatus('error');
      setServerMessage('Network error. Please check your connection and try again.');
      console.error('Admission enquiry error:', err);
    }
  };

  return (
    <section id="admission-enquiry" className="section bg-cream">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Admissions</span>
          <h2>{admissions.heading}</h2>
          <div className="accent-bar"></div>
          <p>{admissions.subheadline}</p>
        </div>

        <div className="admissions-grid">
          <div className="admissions-info card">
            <h3>{admissions.processTitle}</h3>
            <ol className="process-list">
              {admissions.processSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <div className="admissions-section" style={{ marginTop: '2rem' }}>
              <h3>{admissions.eligibilityTitle}</h3>
              <p>{admissions.eligibility}</p>
            </div>

            <div className="admissions-section" style={{ marginTop: '2rem' }}>
              <h3>{admissions.documentsTitle}</h3>
              <ul className="documents-list">
                {admissions.documents.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="admissions-form card">
            <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
              {admissions.formFields.map((field, index) => (
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
              {/* Honeypot spam protection field - hidden from users */}
              <div style={{ display: 'none' }}>
                <label>Leave this field empty</label>
                <input name="_honeypot" type="text" />
              </div>
              <button
                type="submit"
                className="btn btn-burgundy btn-submit"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Submit Enquiry'}
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
    </section>
  );
};

export default AdmissionsSection;
