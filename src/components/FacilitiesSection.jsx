import { schoolData } from '../data/schoolData';
import './styles/Facilities.css';

const FacilitiesSection = () => (
  <section id="facilities" className="section">
    <div className="container">
      <div className="section-header">
        <span className="section-kicker">Facilities</span>
        <h2>School Facilities</h2>
        <div className="accent-bar"></div>
        <p>Modern infrastructure designed to support learning, creativity, and student wellbeing.</p>
      </div>
      <div className="facilities-grid">
        {schoolData.facilities.map((facility, index) => (
          <div key={index} className="facility-card card">
            <div className="card-image">
              <img src={facility.image} alt={facility.imageAlt} loading="lazy" />
            </div>
            <span>{facility.title}</span>
            <span className="facility-description">{facility.description}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FacilitiesSection;
