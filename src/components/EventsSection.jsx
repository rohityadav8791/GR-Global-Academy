import { schoolData } from '../data/schoolData';
import './styles/Events.css';

const EventsSection = () => (
  <section id="events" className="section bg-cream">
    <div className="container">
      <div className="section-header">
        <span className="section-kicker">News & Events</span>
        <h2>Upcoming Events</h2>
        <div className="accent-bar"></div>
        <p>Stay updated with our upcoming school events and celebrations.</p>
      </div>
      <div className="events-grid">
        {schoolData.events.map((event, index) => (
          <div key={index} className="event-card card">
            <div className="event-image">
              <img src={event.image} alt={event.alt} loading="lazy" />
            </div>
            <div className="event-content">
              <span className="event-date">{event.date}</span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="events-actions">
        <a href="#events" className="btn btn-outline">View All Events</a>
      </div>
    </div>
  </section>
);

export default EventsSection;
