import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">ExploreNepal</div>
        <p>Connecting you with the best local guides in the Himalayas.</p>
      </div>
      <div className="footer__bottom">
        &copy; {currentYear} Team Nec-otine. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;