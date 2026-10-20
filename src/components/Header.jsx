import { schoolData } from '../data/schoolData';
import './styles/Header.css';

const TopInfoBar = () => {
  const { topBar } = schoolData;
  return (
    <div className="top-info-bar bg-burgundy text-white">
      <div className="container top-info-container">
        <div className="top-info-item">
          <span className="label">Phone:</span> {topBar.phone}
        </div>
        <div className="top-info-item">
          <span className="label">Email:</span> {topBar.email}
        </div>
        <div className="top-info-item">
          <span className="label">Address:</span> {topBar.address}
        </div>
        <div className="top-info-item">
          <span className="label">Timings:</span> {topBar.timings}
        </div>
        <div className="top-info-item top-info-admission">
          <a href={topBar.admissionLink} className="btn btn-gold btn-sm">Admission Enquiry</a>
        </div>
      </div>
    </div>
  );
};

const Logo = () => (
  <div className="logo">
    <img src="/images/logo.jpeg" alt="Gr Global Academy logo" className="logo-img" />
    <div className="logo-text">
      <span className="logo-name">{schoolData.identity.name}</span>
      <span className="logo-subtitle">{schoolData.identity.tagline}</span>
    </div>
  </div>
);

const Header = () => {
  return (
    <header className="header">
      <TopInfoBar />
      <div className="container header-container">
        <Logo />
        <nav className="nav-desktop">
          <ul>
            {schoolData.navigation.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#admission-enquiry" className="btn btn-burgundy nav-enquiry-btn">
          Enquire for Admission
        </a>

        <details className="nav-mobile">
          <summary className="nav-mobile-toggle" aria-label="Toggle navigation menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </summary>
          <nav className="nav-mobile-menu">
            <ul>
              {schoolData.navigation.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li>
                <a href="#admission-enquiry" className="nav-mobile-enquiry">
                  Enquire for Admission
                </a>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
};

export default Header;
