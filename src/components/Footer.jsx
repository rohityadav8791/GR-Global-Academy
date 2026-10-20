import { schoolData } from '../data/schoolData';
import './styles/Footer.css';

const Footer = () => {
  const { footer } = schoolData;
  return (
    <footer className="footer bg-burgundy text-white">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/images/logo.jpeg" alt="Gr Global Academy logo" className="footer-logo-img" />
              <span className="footer-logo-text">{footer.name}</span>
            </div>
            <p className="footer-desc">{footer.intro}</p>
          </div>
          <div className="footer-divider"></div>
        </div>
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Quick Navigation</h3>
            <ul className="footer-links">
              {footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Academics</h3>
            <ul className="footer-links">
              {footer.academicLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <ul className="footer-contact">
              {footer.contactLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <p className="social-placeholder">{footer.socialNote}</p>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              {footer.legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {footer.copyrightYear} {footer.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
