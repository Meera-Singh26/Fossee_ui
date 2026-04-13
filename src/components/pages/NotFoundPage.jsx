import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.code} aria-hidden="true">404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.sub}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link to="/"          className={styles.btnPrimary}>Go Home</Link>
          <Link to="/workshops" className={styles.btnGhost}>Browse Workshops →</Link>
        </div>
      </div>
    </div>
  );
}
