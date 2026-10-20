import { schoolData } from '../data/schoolData';
import './styles/Welcome.css';

const WelcomeSection = () => {
  const { welcome } = schoolData;
  return (
    <section id="about" className="section bg-cream">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Welcome to Our School</span>
          <h2>{welcome.heading}</h2>
          <div className="accent-bar"></div>
          <p>{schoolData.identity.shortIntro}</p>
        </div>
        <div className="welcome-grid">
          <div className="welcome-text">
            <h3>Our Introduction</h3>
            <p>{welcome.introduction}</p>
            <h3>Educational Philosophy</h3>
            <p>{welcome.philosophy}</p>
            <h3>Mission</h3>
            <p>{welcome.mission}</p>
            <h3>Vision</h3>
            <p>{welcome.vision}</p>
            <div className="welcome-actions">
              <a href={welcome.buttonHref} className="btn btn-burgundy">{welcome.buttonText}</a>
            </div>
          </div>
          <div className="welcome-image">
            <div className="image-wrap" style={{ height: '420px' }}>
              <img src={welcome.image} alt={welcome.imageAlt} loading="lazy" />
              <span className="image-badge">School Building</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
