import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => { const c = { ...e }; delete c[name]; return c; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/dashboard'); }, 1500);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoMark} aria-hidden="true">F</div>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to your FOSSEE account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form} aria-label="Login form">
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              id="email" name="email" type="email"
              value={form.email} onChange={handleChange}
              placeholder="you@college.edu"
              className={`${styles.input} ${errors.email ? styles.inputErr : ''}`}
              autoComplete="email"
              aria-describedby={errors.email ? 'email-err' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span id="email-err" className={styles.error} role="alert">{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <a href="#" className={styles.forgot}>Forgot password?</a>
            </div>
            <input
              id="password" name="password" type="password"
              value={form.password} onChange={handleChange}
              placeholder="••••••••"
              className={`${styles.input} ${errors.password ? styles.inputErr : ''}`}
              autoComplete="current-password"
              aria-describedby={errors.password ? 'pw-err' : undefined}
              aria-invalid={!!errors.password}
            />
            {errors.password && <span id="pw-err" className={styles.error} role="alert">{errors.password}</span>}
          </div>

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading
              ? <span className={styles.spinner} aria-label="Signing in…" />
              : 'Sign In'}
          </button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <div className={styles.footer}>
          <p>Don't have an account?{' '}<Link to="/register" className={styles.link}>Register free →</Link></p>
        </div>
      </div>
    </div>
  );
}
