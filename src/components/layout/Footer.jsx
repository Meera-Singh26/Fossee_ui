import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const LINKS = {
  'Quick Links':  [
    { label: 'Home',       to: '/' },
    { label: 'Workshops',  to: '/workshops' },
    { label: 'About',      to: '/about' },
    { label: 'Dashboard',  to: '/dashboard' },
  ],
  'Resources': [
    { label: 'FOSSEE.in',          href: 'https://fossee.in' },
    { label: 'Spoken Tutorial',    href: 'https://spoken-tutorial.org' },
    { label: 'IIT Bombay',         href: 'https://iitb.ac.in' },
    { label: 'GitHub Repository',  href: 'https://github.com/FOSSEE/workshop_booking' },
  ],
  'Support': [
    { label: 'Contact Us',    href: 'mailto:pythonsupport@fossee.in' },
    { label: 'Report Issue',  href: 'https://github.com/FOSSEE/workshop_booking/issues' },
    { label: 'FAQ',           to: '/about' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>

        {/* Brand column */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <span className={styles.logoMark}>F</span>
            <span className={styles.logoText}>FOSSEE</span>
          </div>
          <p className={styles.tagline}>
            Free &amp; Open Source Software for Science &amp; Engineering Education — an initiative of IIT Bombay, funded by National Mission on Education through ICT, Ministry of Education.
          </p>
          <div className={styles.contactInfo}>
            <a href="mailto:pythonsupport@fossee.in" className={styles.contactLink}>
              pythonsupport@fossee.in
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group} className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>{group}</h3>
            <ul className={styles.linkList} role="list">
              {items.map(({ label, to, href }) => (
                <li key={label}>
                  {to ? (
                    <Link to={to} className={styles.link}>{label}</Link>
                  ) : (
                    <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} FOSSEE, IIT Bombay. All rights reserved.
        </p>
        <p className={styles.moto}>
          Empowering India through Open Source Education
        </p>
      </div>
    </footer>
  );
}
