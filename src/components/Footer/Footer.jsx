import { FaFacebook, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        
        {/* Left Side: Brand & Description */}
        <div className="footer__brand-section">
          <div className="footer__brand">ExploreNepal</div>
          <p>Connecting you with the best local guides in the Himalayas.</p>
        </div>

        {/* Right Side: Contact & Socials */}
        <div className="footer__contact-socials">
          <div className="footer__contact">
            <a href="tel:+9779800000000" className="footer__link">
              <FaPhoneAlt /> +977 9800000000
            </a>
            <a href="mailto:hello@explore-nepal.com" className="footer__link">
              <FaEnvelope /> Email Us
            </a>
          </div>
          
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>
      
      <div className="footer__bottom">
        &copy; {currentYear} Team Nec-otine. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;