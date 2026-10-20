import { schoolData } from '../data/schoolData';
import './styles/Hero.css';

const HeroSection = () => {
  const { hero } = schoolData;
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-image">
          <div className="image-wrap" style={{ height: '650px', width: '100%' }}>
            <img
              src={hero.image}
              alt={hero.imageAlt}
              loading="eager"
            />
            <span className="image-badge">Campus View</span>
          </div>
        </div>
        <div className="hero-content">
          <span className="hero-kicker">{schoolData.identity.tagline}</span>
          <h1>{hero.headline}</h1>
          <p className="hero-subtitle">{hero.subheadline}</p>
          <div className="hero-highlights">
            {hero.highlights.map((h, i) => (
              <div key={i} className="highlight-item">
                <span className="highlight-value">{h.value}</span>
                <span className="highlight-label">{h.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-outline">{hero.primaryButton}</a>
            <a href={hero.secondaryButtonHref} className="btn btn-burgundy">{hero.secondaryButton}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
