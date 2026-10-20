import { schoolData } from '../data/schoolData';
import './styles/Principal.css';

const PrincipalMessage = () => {
  const { principal } = schoolData;
  return (
    <section className="section bg-soft-cream">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Principal's Message</span>
          <h2>A Message from Our Leadership</h2>
          <div className="accent-bar"></div>
          <p>Thoughts on education, discipline, curiosity, values, and student development.</p>
        </div>
        <div className="principal-grid">
          <div className="principal-portrait">
            <div className="image-wrap" style={{ height: '360px', width: '100%' }}>
              <img src={principal.image} alt={principal.imageAlt} loading="lazy" />
              <span className="image-badge">Principal Portrait</span>
            </div>
          </div>
          <div className="principal-content">
            <div className="principal-meta">
              <h3>{principal.name}</h3>
              <p className="principal-designation">{principal.designation}</p>
            </div>
            <p className="principal-message">{principal.message}</p>
            {principal.note && <p className="principal-note">{principal.note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;
