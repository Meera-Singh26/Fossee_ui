import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';

const TOOLS = ['Python', 'Scilab', 'R', 'LaTeX', 'OpenFOAM', 'DWSIM', 'CellDesigner', 'Osdag', 'QGIS', 'eSim'];

const FAQS = [
  { q: 'Are FOSSEE workshops free?', a: 'Yes, all FOSSEE workshops are completely free of charge for students and educators across India.' },
  { q: 'Who can attend FOSSEE workshops?', a: 'Any student, teacher, or professional interested in open-source tools can register. Workshops are designed for various skill levels.' },
  { q: 'Will I receive a certificate?', a: 'Yes, participants who complete the workshop and pass the assessment receive a certificate from IIT Bombay / FOSSEE.' },
  { q: 'How do I cancel my booking?', a: 'Log in to your dashboard and navigate to your bookings. You can cancel up to 48 hours before the workshop starts.' },
  { q: 'Are workshops conducted online or offline?', a: 'FOSSEE conducts both online (via Zoom/Teams) and offline (at partner institutes) workshops. The mode is mentioned on each workshop listing.' },
];

export default function AboutPage() {
  const [open, setOpen] = React.useState(null);

  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>// about fossee</p>
          <h1 className={styles.title}>Empowering India Through Open Source</h1>
          <p className={styles.subtitle}>
            FOSSEE (Free/Libre and Open Source Software for Education) is an initiative of IIT Bombay, funded by the National Mission on Education through ICT (NME-ICT), Ministry of Education, Government of India.
          </p>
        </div>
      </div>

      <div className="container">

        {/* Mission */}
        <section className={`section ${styles.mission}`} aria-labelledby="mission-heading">
          <div className={styles.missionGrid}>
            <div>
              <h2 id="mission-heading">Our Mission</h2>
              <p>
                FOSSEE promotes the use of open-source software in education, replacing expensive proprietary tools with free, powerful alternatives. We create learning materials, conduct workshops, and support a community of open-source learners across India.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Through our workshop portal, we connect expert faculty from IIT Bombay with students and professionals nationwide, enabling hands-on training on tools like Python, Scilab, R, LaTeX, and many more.
              </p>
            </div>
            <div className={styles.missionStats}>
              {[
                ['10,000+', 'Workshops Conducted'],
                ['5 Lakh+', 'Students Trained'],
                ['800+',    'Partner Colleges'],
                ['15+',     'Open Source Tools'],
                ['2009',    'Year Founded'],
              ].map(([val, label]) => (
                <div key={label} className={`card ${styles.mStat}`}>
                  <span className={styles.mStatVal}>{val}</span>
                  <span className={styles.mStatLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className={styles.toolsSection} aria-labelledby="tools-heading">
          <h2 id="tools-heading">Tools We Teach</h2>
          <p>We conduct workshops on a wide range of open-source tools used in science, engineering, and education.</p>
          <div className={styles.tools}>
            {TOOLS.map(t => (
              <span key={t} className={styles.toolChip}>{t}</span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <h2 id="faq-heading">Frequently Asked Questions</h2>
          <div className={styles.faqs} role="list">
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                className={`card ${styles.faq} ${open === i ? styles.faqOpen : ''}`}
                role="listitem"
              >
                <button
                  className={styles.faqQ}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-ans-${i}`}
                >
                  <span>{q}</span>
                  <span className={styles.faqIcon} aria-hidden="true">{open === i ? '−' : '+'}</span>
                </button>
                <div
                  id={`faq-ans-${i}`}
                  className={styles.faqA}
                  style={{ display: open === i ? 'block' : 'none' }}
                >
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className={`card ${styles.contact}`} aria-labelledby="contact-heading">
          <div>
            <h2 id="contact-heading" style={{ marginBottom: '0.5rem' }}>Get in Touch</h2>
            <p>Have questions about workshops or partnerships? Reach out to the FOSSEE team.</p>
          </div>
          <div className={styles.contactLinks}>
            <a href="mailto:pythonsupport@fossee.in" className={styles.contactBtn}>
              Email Us
            </a>
            <a href="https://fossee.in" target="_blank" rel="noopener noreferrer" className={styles.contactBtnGhost}>
              Visit FOSSEE.in →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
