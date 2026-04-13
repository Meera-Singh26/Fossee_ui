import React from 'react';
import { Link } from 'react-router-dom';
import { WORKSHOPS } from '../../utils/mockData';
import styles from './DashboardPage.module.css';

// Mock: user has booked first 2 workshops
const MY_BOOKINGS = [
  { workshop: WORKSHOPS[0], status: 'Confirmed', ref: 'WS-1-834721', date: '2025-04-01' },
  { workshop: WORKSHOPS[3], status: 'Confirmed', ref: 'WS-4-219043', date: '2025-04-10' },
];

const UPCOMING = WORKSHOPS.filter((_, i) => i > 3);

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        {/* Welcome header */}
        <div className={styles.welcome}>
          <div>
            <p className={styles.eyebrow}>// dashboard</p>
            <h1 className={styles.title}>Welcome, Ravi 👋</h1>
            <p className={styles.sub}>ravi@college.edu · NIT Trichy · Computer Science</p>
          </div>
          <Link to="/workshops" className={styles.browseBtn}>Browse Workshops →</Link>
        </div>

        {/* Stats strip */}
        <div className={styles.statsStrip}>
          {[
            { label: 'Workshops Booked', value: MY_BOOKINGS.length },
            { label: 'Certificates Earned', value: 0 },
            { label: 'Workshops Attended', value: 0 },
          ].map(({ label, value }) => (
            <div key={label} className={`card ${styles.statCard}`}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* My bookings */}
        <section className={styles.section} aria-labelledby="bookings-heading">
          <h2 id="bookings-heading" className={styles.sectionTitle}>My Bookings</h2>
          {MY_BOOKINGS.length === 0 ? (
            <div className={styles.empty}>
              <p>You haven't booked any workshops yet.</p>
              <Link to="/workshops" className={styles.emptyLink}>Browse workshops →</Link>
            </div>
          ) : (
            <div className={styles.bookingList} role="list">
              {MY_BOOKINGS.map(({ workshop: w, status, ref, date }) => (
                <div key={ref} className={`card ${styles.bookingCard}`} role="listitem">
                  <div className={styles.bookingHeader}>
                    <div>
                      <span className="badge badge-accent">{w.category}</span>
                      <span className={`badge ${w.mode === 'Online' ? 'badge-blue' : 'badge-dim'}`}>{w.mode}</span>
                    </div>
                    <span className="badge badge-green">{status}</span>
                  </div>
                  <h3 className={styles.bookingTitle}>{w.title}</h3>
                  <div className={styles.bookingMeta}>
                    <span>📅 {new Date(w.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>📍 {w.location}</span>
                    <span>👤 {w.instructor}</span>
                  </div>
                  <div className={styles.bookingFooter}>
                    <span className={styles.refCode}>Ref: {ref}</span>
                    <span className={styles.bookedOn}>Booked on {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recommended workshops */}
        <section className={styles.section} aria-labelledby="rec-heading">
          <div className={styles.sectionHeader}>
            <h2 id="rec-heading" className={styles.sectionTitle}>Recommended for You</h2>
            <Link to="/workshops" className={styles.seeAll}>View all →</Link>
          </div>
          <div className="grid-auto stagger">
            {UPCOMING.map((w, i) => (
              <div key={w.id} className={`card ${styles.recCard} animate-fade-up`} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={styles.recTags}>
                  <span className="badge badge-accent">{w.category}</span>
                  <span className={`badge ${w.level === 'Beginner' ? 'badge-green' : w.level === 'Advanced' ? 'badge-red' : 'badge-blue'}`}>{w.level}</span>
                </div>
                <h3 className={styles.recTitle}>{w.title}</h3>
                <p className={styles.recDesc}>{w.description.slice(0, 90)}…</p>
                <div className={styles.recMeta}>
                  <span>📅 {new Date(w.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  <span>{w.mode}</span>
                </div>
                <div className={styles.recFooter}>
                  {w.bookedSeats >= w.seats
                    ? <span className="badge badge-red">Full</span>
                    : <Link to={`/book/${w.id}`} className={styles.recBook}>Book Now →</Link>
                  }
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
