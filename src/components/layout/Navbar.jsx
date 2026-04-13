import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/workshops', label: 'Workshops' },
  { to: '/about',     label: 'About' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const location = useLocation();
  const menuRef  = useRef(null);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // Trap scroll when menu open on mobile
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <nav className={styles.nav} ref={menuRef} aria-label="Main navigation">
        <div className={styles.container}>

          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="FOSSEE Workshop Booking – Home">
            <span className={styles.logoMark}>F</span>
            <span className={styles.logoText}>FOSSEE</span>
            <span className={styles.logoPipe} aria-hidden="true">/</span>
            <span className={styles.logoSub}>Workshops</span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.desktopLinks} role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth buttons (desktop) */}
          <div className={styles.authButtons}>
            <Link to="/login"    className={styles.btnGhost}>Login</Link>
            <Link to="/register" className={styles.btnPrimary}>Register</Link>
          </div>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`}    />
            <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`}    />
            <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`}    />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          id="mobile-menu"
          className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
          aria-hidden={!menuOpen}
        >
          <ul role="list" className={styles.mobileLinks}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                  }
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={styles.mobileAuth}>
            <Link to="/login"    className={styles.mobileGhost}   tabIndex={menuOpen ? 0 : -1}>Login</Link>
            <Link to="/register" className={styles.mobilePrimary} tabIndex={menuOpen ? 0 : -1}>Register Free</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
