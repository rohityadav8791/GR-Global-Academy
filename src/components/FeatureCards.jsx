import { schoolData } from '../data/schoolData';
import './styles/FeatureCards.css';

const ICON_MAP = {
  'graduation-cap': '&#127901;',
  'users': '&#128105;',
  'building': '&#127968;',
  'award': '&#127942;',
  'palette': '&#127920;',
  'heart': '&#10084;',
  'calendar': '&#128197;',
};

const FeatureCards = () => (
  <section id="features" className="section">
    <div className="container">
      <div className="section-header">
        <span className="section-kicker">Why Choose Us</span>
        <h2>What Makes Gr Global Academy Special</h2>
        <div className="accent-bar"></div>
        <p>A commitment to excellence, holistic growth, and a supportive learning community.</p>
      </div>
      <div className="features-grid">
        {schoolData.features.map((feature, index) => (
          <div key={index} className="feature-card card">
            <div className="feature-icon">
              <span dangerouslySetInnerHTML={{ __html: ICON_MAP[feature.icon] || '&#128154;' }} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureCards;
