import React from 'react';
import { Link } from 'react-router-dom';
import WorkshopCard from '../ui/WorkshopCard';
import { WORKSHOPS, STATS, TESTIMONIALS } from '../../utils/mockData';
import styles from './HomePage.module.css';

const FEATURED = WORKSHOPS.slice(0, 3);

export default function HomePage() {
  return (
    <div className={styles.page}>

      {/* ─── HERO ─── */}
      <section className={styles.hero} aria-label="Introduction">
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.gridLines} />
          <div className={styles.glow1} />
          <div className={styles.glow2} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={`${styles.heroBadge} animate-fade-up`}>
            <span className="badge badge-accent">
              <span style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'var(--color-accent)', animation:'pulse-dot 1.5s ease-in-out infinite' }} />
              IIT Bombay Initiative
            </span>
          </div>
          <h1 className={`${styles.heroTitle} animate-fade-up`} style={{ animationDelay:'0.05s' }}>
            Learn. Build.<br />
            <span className={styles.heroAccent}>Open Source.</span>
          </h1>
          <p className={`${styles.heroSubtitle} animate-fade-up`} style={{ animationDelay:'0.12s' }}>
            Book free workshops on Python, Scilab, R, LaTeX and more — conducted by IIT Bombay faculty. Designed for students across India.
          </p>
          <div className={`${styles.heroCTA} animate-fade-up`} style={{ animationDelay:'0.18s' }}>
            <Link to="/workshops" className={styles.ctaPrimary} aria-label="Browse all workshops">
              Browse Workshops
            </Link>
            <Link to="/register" className={styles.ctaSecondary}>
              Create Account →
            </Link>
          </div>

          {/* Quick trust signals */}
          <div className={`${styles.heroStats} animate-fade-up stagger`} style={{ animationDelay:'0.24s' }}>
            {STATS.map(({ value, label }) => (
              <div key={label} className={styles.heroStat}>
                <span className={styles.heroStatValue}>{value}</span>
                <span className={styles.heroStatLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED WORKSHOPS ─── */}
      <section className={`section ${styles.workshopsSection}`} aria-labelledby="featured-heading">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>// upcoming</p>
              <h2 id="featured-heading">Featured Workshops</h2>
            </div>
            <Link to="/workshops" className={styles.seeAll}>View All →</Link>
          </div>
          <div className={`grid-auto stagger`}>
            {FEATURED.map((w, i) => (
              <WorkshopCard key={w.id} workshop={w} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES STRIP ─── */}
      <section className={styles.categoriesSection} aria-label="Workshop categories">
        <div className="container">
          <p className={styles.sectionEyebrow}>// tools we teach</p>
          <div className={styles.categories}>
            {['Python', 'Scilab', 'R', 'LaTeX', 'OpenFOAM', 'DWSIM', 'CellDesigner', 'Osdag'].map(cat => (
              <Link key={cat} to={`/workshops?category=${cat}`} className={styles.categoryChip}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className={`section`} aria-labelledby="how-heading">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>// simple process</p>
              <h2 id="how-heading">How It Works</h2>
            </div>
          </div>
          <div className={`${styles.steps} stagger`}>
            {[
              { step: '01', title: 'Register',        desc: 'Create a free account using your college email address.' },
              { step: '02', title: 'Browse & Choose',  desc: 'Explore upcoming workshops filtered by tool, level, or mode.' },
              { step: '03', title: 'Book Your Seat',   desc: 'Fill the booking form and confirm your registration instantly.' },
              { step: '04', title: 'Attend & Certify', desc: 'Join the workshop and earn a certificate upon completion.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className={`card ${styles.step} animate-fade-up`}>
                <span className={styles.stepNum}>{step}</span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className={`section ${styles.testimonialsSection}`} aria-labelledby="testimonials-heading">
        <div className="container">
          <p className={styles.sectionEyebrow}>// student stories</p>
          <h2 id="testimonials-heading">What Students Say</h2>
          <div className={`${styles.testimonials} stagger`}>
            {TESTIMONIALS.map(({ name, college, text, course }) => (
              <blockquote key={name} className={`card ${styles.testimonial} animate-fade-up`}>
                <p className={styles.testimonialText}>"{text}"</p>
                <footer className={styles.testimonialFooter}>
                  <div className={styles.testimonialAvatar} aria-hidden="true">
                    {name[0]}
                  </div>
                  <div>
                    <cite className={styles.testimonialName}>{name}</cite>
                    <p className={styles.testimonialMeta}>{college} · {course}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className={styles.ctaBanner} aria-label="Call to action">
        <div className="container">
          <div className={styles.bannerInner}>
            <div>
              <h2 className={styles.bannerTitle}>Ready to start learning?</h2>
              <p className={styles.bannerSub}>Join 5 Lakh+ students trained through FOSSEE workshops. It's free.</p>
            </div>
            <div className={styles.bannerActions}>
              <Link to="/register" className={styles.ctaPrimary}>Register Free</Link>
              <Link to="/workshops" className={styles.ctaSecondary}>Explore Workshops</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
