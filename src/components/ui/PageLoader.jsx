import React from 'react';

export default function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page…"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: '8px',
      }}
    >
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            display: 'block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            animation: 'pulse-dot 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
