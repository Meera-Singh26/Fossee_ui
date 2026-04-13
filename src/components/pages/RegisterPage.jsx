import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name:'', email:'', phone:'', college:'', password:'', confirm:'' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => { const c = { ...e }; delete c[name]; return c; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim())      errs.name    = 'Full name required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) errs.phone = 'Valid 10-digit mobile required';
    if (!form.college.trim())   errs.college = 'College name required';
    if (form.password.length < 8) errs.password = 'Password must be 8+ characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/dashboard'); }, 1800);
  }

  const fields = [
    { id:'name',     label:'Full Name',          type:'text',     placeholder:'Ravi Kumar',          autoComplete:'name' },
    { id:'email',    label:'Email Address',       type:'email',    placeholder:'you@college.edu',     autoComplete:'email' },
    { id:'phone',    label:'Mobile Number',       type:'tel',      placeholder:'9876543210',          autoComplete:'tel', maxLength:10 },
    { id:'college',  label:'College / University',type:'text',    placeholder:'IIT Bombay',          autoComplete:'organization' },
    { id:'password', label:'Password',            type:'password', placeholder:'Min. 8 characters',  autoComplete:'new-password' },
    { id:'confirm',  label:'Confirm Password',    type:'password', placeholder:'Repeat password',    autoComplete:'new-password' },
  ];

  return (
    <div className={styles.page}>
      <div className={`${styles.card} ${styles.cardWide}`}>
        <div className={styles.header}>
          <div className={styles.logoMark} aria-hidden="true">F</div>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join FOSSEE and book free workshops</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form} aria-label="Registration form">
          <div className={styles.grid2}>
            {fields.map(({ id, label, type, placeholder, autoComplete, maxLength }) => (
              <div key={id} className={styles.field}>
                <label htmlFor={id} className={styles.label}>{label}</label>
                <input
                  id={id} name={id} type={type}
                  value={form[id]} onChange={handleChange}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                  className={`${styles.input} ${errors[id] ? styles.inputErr : ''}`}
                  aria-describedby={errors[id] ? `${id}-err` : undefined}
                  aria-invalid={!!errors[id]}
                />
                {errors[id] && <span id={`${id}-err`} className={styles.error} role="alert">{errors[id]}</span>}
              </div>
            ))}
          </div>

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading
              ? <span className={styles.spinner} aria-label="Creating account…" />
              : 'Create Account →'}
          </button>
        </form>

        <div className={styles.divider}><span>or</span></div>
        <div className={styles.footer}>
          <p>Already have an account?{' '}<Link to="/login" className={styles.link}>Sign in →</Link></p>
        </div>
      </div>
    </div>
  );
}
