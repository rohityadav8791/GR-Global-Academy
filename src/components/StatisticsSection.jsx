import { schoolData } from '../data/schoolData';
import './styles/Statistics.css';

const ICON_MAP = {
  users: '&#128105;',
  'graduation-cap': '&#127901;',
  award: '&#127942;',
  calendar: '&#128197;',
};

const StatisticsSection = () => {
  const { statistics } = schoolData;
  return (
    <section id="statistics" className="section bg-burgundy text-white">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <span className="section-kicker" style={{ color: 'var(--gold)' }}>Our Numbers at a Glance</span>
          <h2 style={{ color: 'var(--white)' }}>{statistics.title}</h2>
          <div className="accent-bar" style={{ background: 'var(--gold)' }}></div>
          <p style={{ color: 'rgba(255,255,255,0.85)' }}>{statistics.subtitle}</p>
        </div>
        <div className="statistics-grid">
          {statistics.items.map((item, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <span dangerouslySetInnerHTML={{ __html: ICON_MAP[item.icon] || '&#128154;' }} />
              </div>
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
