import { schoolData } from '../data/schoolData';
import './styles/Academics.css';

const AcademicsSection = () => (
  <section id="academics" className="section bg-cream">
    <div className="container">
      <div className="section-header">
        <span className="section-kicker">Academics</span>
        <h2>Academic Programmes</h2>
        <div className="accent-bar"></div>
        <p>Academic programmes offered at Gr Global Academy.</p>
      </div>
      <div className="academics-grid">
        {schoolData.academics.map((program, index) => (
          <div key={index} className="academic-card card">
            <div className="card-image">
              <img src={program.image} alt={program.imageAlt} loading="lazy" />
              <span className="card-badge">{program.title}</span>
            </div>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
          </div>
          ))}
        </div>
      </div>
    </section>
  );

export default AcademicsSection;
