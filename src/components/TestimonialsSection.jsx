import { schoolData } from '../data/schoolData';
import './styles/Testimonials.css';

const TestimonialsSection = () => (
  <section id="testimonials" className="section bg-soft-cream">
    <div className="container">
      <div className="section-header">
        <span className="section-kicker">Testimonials</span>
        <h2>What Our Community Says</h2>
        <div className="accent-bar"></div>
        <p>Hear from our parents and students about their experience at Gr Global Academy.</p>
      </div>
      <div className="testimonials-grid">
        {schoolData.testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card card">
            <div className="testimonial-content">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-meta">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
            {testimonial.note && <p className="testimonial-note edit-note">{testimonial.note}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
