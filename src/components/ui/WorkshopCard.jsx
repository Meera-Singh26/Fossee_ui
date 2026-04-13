import React from 'react';
import { Link } from 'react-router-dom';
import styles from './WorkshopCard.module.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function seatColor(booked, total) {
  const pct = booked / total;
  if (pct >= 1)   return '#ef4444';
  if (pct >= 0.8) return '#f59e0b';
  return '#22c55e';
}

export default function WorkshopCard({ workshop, delay = 0 }) {
  const { id, title, category, level, duration, date, seats, bookedSeats, instructor, location, mode, description, topics } = workshop;
  const isFull    = bookedSeats >= seats;
  const remaining = seats - bookedSeats;
  const pct       = Math.min((bookedSeats / seats) * 100, 100);
  const color     = seatColor(bookedSeats, seats);

  return (
    <article
      className={`card ${styles.card} animate-fade-up`}
      style={{ animationDelay: `${delay}s` }}
      aria-label={`Workshop: ${title}`}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.tags}>
          <span className="badge badge-accent">{category}</span>
          <span className={`badge ${level === 'Beginner' ? 'badge-green' : level === 'Advanced' ? 'badge-red' : 'badge-blue'}`}>
            {level}
          </span>
          <span className={`badge ${mode === 'Online' ? 'badge-blue' : 'badge-dim'}`}>{mode}</span>
        </div>
        {isFull && <span className="badge badge-red" aria-label="Workshop is full">Full</span>}
      </div>

      {/* Title */}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>

      {/* Topics */}
      <div className={styles.topics} aria-label="Topics covered">
        {topics.map(t => (
          <span key={t} className={styles.topic}>{t}</span>
        ))}
      </div>

      {/* Meta grid */}
      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>📅 Date</dt>
          <dd className={styles.metaValue}>{formatDate(date)}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>⏱ Duration</dt>
          <dd className={styles.metaValue}>{duration}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>👤 Instructor</dt>
          <dd className={styles.metaValue}>{instructor}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>📍 Location</dt>
          <dd className={styles.metaValue}>{location}</dd>
        </div>
      </dl>

      {/* Seat progress */}
      <div className={styles.seats} role="group" aria-label="Seat availability">
        <div className={styles.seatsHeader}>
          <span className={styles.seatsLabel}>Seats</span>
          <span className={styles.seatsCount} style={{ color }}>
            {isFull ? 'Full' : `${remaining} left`}
          </span>
        </div>
        <div className={styles.progressBar} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.progressFill} style={{ width: `${pct}%`, background: color }} />
        </div>
        <span className={styles.seatsTotal}>{bookedSeats}/{seats} booked</span>
      </div>

      {/* CTA */}
      <div className={styles.footer}>
        {isFull ? (
          <button className={styles.btnDisabled} disabled aria-disabled="true">Workshop Full</button>
        ) : (
          <Link to={`/book/${id}`} className={styles.btnBook} aria-label={`Book ${title}`}>
            Book Now
          </Link>
        )}
        <Link to={`/workshops`} className={styles.btnDetails}>Details →</Link>
      </div>
    </article>
  );
}
