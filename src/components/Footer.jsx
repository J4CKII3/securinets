import { site } from '../data/site.js';
import clubLogo from '../assets/iteam/bg.png';

const socialIcons = {
  Facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" fill="currentColor" />
    </svg>
  ),
  Discord: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.7 5.2a18 18 0 0 0-4.4-1.4l-.5 1a16 16 0 0 0-5.6 0l-.5-1a18 18 0 0 0-4.4 1.4C1.5 9.3.7 13.3 1.1 17.2a18 18 0 0 0 5.4 2.7l1.2-2a11 11 0 0 1-1.9-.9l.5-.4a13 13 0 0 0 11.4 0l.5.4a11 11 0 0 1-1.9.9l1.2 2a18 18 0 0 0 5.4-2.7c.5-4.5-.8-8.5-3.2-12Zm-11 9.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" fill="currentColor" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  ),
};

export default function Footer() {
  const socials = Object.entries(site.socials);

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <img src={clubLogo} alt={`${site.name} logo`} />
            <a
              className="footer-address"
              href={site.addressUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Our address</span>
              {site.address}
            </a>
          </div>
          <div className="footer-follow">
            <h2>Follow us</h2>
            <ul className="footer-socials" aria-label="Social media">
              {socials.map(([label, url]) => (
                <li key={label}>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    {socialIcons[label]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="footer-rights">
          &copy; {new Date().getFullYear()} {site.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
