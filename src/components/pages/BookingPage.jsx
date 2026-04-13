import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { WORKSHOPS } from '../../utils/mockData';
import styles from './BookingPage.module.css';

const STEPS = ['Details', 'Confirm', 'Done'];

function validate(form) {
  const errs = {};
  if (!form.name.trim())         errs.name    = 'Full name is required';
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
  if (!form.phone.match(/^[6-9]\d{9}$/))                errs.phone = 'Valid 10-digit Indian mobile required';
  if (!form.college.trim())      errs.college = 'College name is required';
  if (!form.branch.trim())       errs.branch  = 'Branch is required';
  if (!form.year)                errs.year    = 'Year of study is required';
  return errs;
}

export default function BookingPage() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const workshop   = WORKSHOPS.find(w => w.id === Number(id));
  const [step, setStep]     = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm]     = useState({
    name: '', email: '', phone: '', college: '', branch: '',
    year: '', rollNo: '', message: '', consent: false,
  });
  const [errors, setErrors] = useState({});

  if (!workshop) {
    return (
      <div className={styles.notFound}>
        <h2>Workshop not found</h2>
        <Link to="/workshops" className={styles.backLink}>← Back to Workshops</Link>
      </div>
    );
  }
  if (workshop.bookedSeats >= workshop.seats) {
    return (
      <div className={styles.notFound}>
        <h2>This workshop is full</h2>
        <p>All seats have been booked. Check other upcoming workshops.</p>
        <Link to="/workshops" className={styles.backLink}>← Browse Workshops</Link>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(e => { const c = { ...e }; delete c[name]; return c; });
  }

  function handleNext() {
    const errs = validate(form);
    if (!form.consent) errs.consent = 'You must agree to the terms';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleConfirm() {
    setLoading(true);
    // Simulate API call
    setTimeout(() => { setLoading(false); setStep(2); }, 1800);
  }

  const isFull = workshop.bookedSeats >= workshop.seats;

  return (
    <div className={styles.page}>
      <div className={`container ${styles.layout}`}>

        {/* Left: Form area */}
        <div className={styles.formArea}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/workshops">Workshops</Link>
            <span aria-hidden="true">›</span>
            <span>Book</span>
          </nav>

          {/* Stepper */}
          <div className={styles.stepper} role="list" aria-label="Booking steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div
                  className={`${styles.stepDot} ${i === step ? styles.stepActive : ''} ${i < step ? styles.stepDone : ''}`}
                  role="listitem"
                  aria-current={i === step ? 'step' : undefined}
                >
                  <span className={styles.stepCircle}>{i < step ? '✓' : i + 1}</span>
                  <span className={styles.stepLabel}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>

          {/* ── STEP 0: FORM ── */}
          {step === 0 && (
            <form className={styles.form} onSubmit={e => { e.preventDefault(); handleNext(); }} noValidate aria-label="Booking form">
              <h2 className={styles.formTitle}>Your Details</h2>

              <div className={styles.fieldGrid}>
                <Field label="Full Name *" error={errors.name}>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Ravi Kumar" className={inputClass(errors.name)} autoComplete="name" />
                </Field>
                <Field label="Email Address *" error={errors.email}>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="ravi@college.edu" className={inputClass(errors.email)} autoComplete="email" />
                </Field>
                <Field label="Mobile Number *" error={errors.phone}>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" className={inputClass(errors.phone)} autoComplete="tel" maxLength={10} />
                </Field>
                <Field label="College / University *" error={errors.college}>
                  <input name="college" value={form.college} onChange={handleChange} placeholder="IIT Bombay" className={inputClass(errors.college)} />
                </Field>
                <Field label="Branch / Department *" error={errors.branch}>
                  <input name="branch" value={form.branch} onChange={handleChange} placeholder="Computer Science" className={inputClass(errors.branch)} />
                </Field>
                <Field label="Year of Study *" error={errors.year}>
                  <select name="year" value={form.year} onChange={handleChange} className={inputClass(errors.year)}>
                    <option value="">Select year</option>
                    {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Post-Graduate', 'PhD'].map(y => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Roll Number (optional)">
                  <input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="21B010001" className={styles.input} />
                </Field>
              </div>

              <Field label="Any message for the instructor? (optional)">
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="e.g. I've some experience with Python…" rows={3} className={styles.textarea} />
              </Field>

              <label className={`${styles.consent} ${errors.consent ? styles.consentError : ''}`}>
                <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className={styles.checkbox} />
                <span>
                  I agree to the{' '}
                  <a href="https://fossee.in" target="_blank" rel="noopener noreferrer" className={styles.consentLink}>
                    FOSSEE terms
                  </a>{' '}
                  and confirm that the provided information is accurate.
                </span>
              </label>
              {errors.consent && <span className={styles.error} role="alert">{errors.consent}</span>}

              <button type="submit" className={styles.btnPrimary}>
                Review Booking →
              </button>
            </form>
          )}

          {/* ── STEP 1: CONFIRM ── */}
          {step === 1 && (
            <div className={styles.confirm}>
              <h2 className={styles.formTitle}>Confirm Your Booking</h2>
              <div className={styles.summary}>
                {[
                  ['Name',        form.name],
                  ['Email',       form.email],
                  ['Mobile',      form.phone],
                  ['College',     form.college],
                  ['Branch',      form.branch],
                  ['Year',        form.year],
                  form.rollNo ? ['Roll No.', form.rollNo] : null,
                ].filter(Boolean).map(([label, value]) => (
                  <div key={label} className={styles.summaryRow}>
                    <dt className={styles.summaryLabel}>{label}</dt>
                    <dd className={styles.summaryValue}>{value}</dd>
                  </div>
                ))}
              </div>
              <div className={styles.confirmActions}>
                <button onClick={() => setStep(0)} className={styles.btnGhost}>← Edit Details</button>
                <button onClick={handleConfirm} className={styles.btnPrimary} disabled={loading}>
                  {loading ? (
                    <span className={styles.spinner} aria-label="Processing…" />
                  ) : 'Confirm Booking ✓'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: SUCCESS ── */}
          {step === 2 && (
            <div className={styles.success} role="status" aria-live="polite">
              <div className={styles.successIcon} aria-hidden="true">✓</div>
              <h2>Booking Confirmed!</h2>
              <p>
                A confirmation has been sent to <strong>{form.email}</strong>. Please check your inbox (and spam folder).
              </p>
              <div className={styles.successRef}>
                Ref: <span className={styles.refCode}>WS-{workshop.id}-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className={styles.successActions}>
                <Link to="/dashboard" className={styles.btnPrimary}>Go to Dashboard</Link>
                <Link to="/workshops" className={styles.btnGhost}>Browse More Workshops</Link>
              </div>
            </div>
          )}
        </div>

        {/* Right: Workshop summary sidebar */}
        {step < 2 && (
          <aside className={styles.sidebar} aria-label="Workshop summary">
            <div className={`card ${styles.sideCard}`}>
              <div className={styles.sideHeader}>
                <span className="badge badge-accent">{workshop.category}</span>
                <span className={`badge ${workshop.mode === 'Online' ? 'badge-blue' : 'badge-dim'}`}>{workshop.mode}</span>
              </div>
              <h3 className={styles.sideTitle}>{workshop.title}</h3>
              <dl className={styles.sideMeta}>
                {[
                  ['📅 Date',       new Date(workshop.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
                  ['⏱ Duration',    workshop.duration],
                  ['👤 Instructor', workshop.instructor],
                  ['📍 Location',   workshop.location],
                  ['🎯 Level',      workshop.level],
                ].map(([label, value]) => (
                  <div key={label} className={styles.sideMetaRow}>
                    <dt className={styles.sideMetaLabel}>{label}</dt>
                    <dd className={styles.sideMetaValue}>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.divider} />
              <div className={styles.seatInfo}>
                <span className={styles.seatsLeft} style={{ color: isFull ? '#ef4444' : '#22c55e' }}>
                  {workshop.seats - workshop.bookedSeats} seats remaining
                </span>
                <span className={styles.seatsFull}>{workshop.bookedSeats}/{workshop.seats} booked</span>
              </div>
              <p className={styles.freeNote}>🎉 This workshop is <strong>free of charge</strong></p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: '0.75rem', color: '#ef4444' }} role="alert">{error}</span>}
    </div>
  );
}

function inputClass(err) {
  return err
    ? 'input-err'  // handled in module css via global
    : '';
}
