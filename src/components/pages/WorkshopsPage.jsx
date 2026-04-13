import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WorkshopCard from '../ui/WorkshopCard';
import { WORKSHOPS, CATEGORIES, LEVELS, MODES } from '../../utils/mockData';
import styles from './WorkshopsPage.module.css';

export default function WorkshopsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [level,    setLevel]    = useState('All Levels');
  const [mode,     setMode]     = useState('All Modes');

  // Sync category from URL param
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return WORKSHOPS.filter(w => {
      const matchSearch   = !search || w.title.toLowerCase().includes(search.toLowerCase()) || w.description.toLowerCase().includes(search.toLowerCase()) || w.topics.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = category === 'All' || w.category === category;
      const matchLevel    = level    === 'All Levels' || w.level === level;
      const matchMode     = mode     === 'All Modes'  || w.mode  === mode;
      return matchSearch && matchCategory && matchLevel && matchMode;
    });
  }, [search, category, level, mode]);

  function resetFilters() {
    setSearch(''); setCategory('All'); setLevel('All Levels'); setMode('All Modes');
    setSearchParams({});
  }

  const hasFilters = search || category !== 'All' || level !== 'All Levels' || mode !== 'All Modes';

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.eyebrow}>// all workshops</p>
          <h1 className={styles.title}>Browse Workshops</h1>
          <p className={styles.subtitle}>
            Free, expert-led workshops on open-source tools — for engineering and science students across India.
          </p>
        </div>
      </div>

      <div className="container">
        {/* ─── FILTERS ─── */}
        <div className={styles.filtersBar} role="search" aria-label="Filter workshops">
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="search"
              placeholder="Search workshops, topics…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
              aria-label="Search workshops"
            />
          </div>

          {/* Selects */}
          <div className={styles.selects}>
            <select
              value={category}
              onChange={e => { setCategory(e.target.value); setSearchParams(e.target.value !== 'All' ? { category: e.target.value } : {}); }}
              className={styles.select}
              aria-label="Filter by category"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>

            <select value={level} onChange={e => setLevel(e.target.value)} className={styles.select} aria-label="Filter by level">
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>

            <select value={mode} onChange={e => setMode(e.target.value)} className={styles.select} aria-label="Filter by mode">
              {MODES.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          {hasFilters && (
            <button onClick={resetFilters} className={styles.resetBtn} aria-label="Clear all filters">
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Results count */}
        <div className={styles.resultsBar} aria-live="polite" aria-atomic="true">
          <span className={styles.count}>
            {filtered.length} workshop{filtered.length !== 1 ? 's' : ''} found
          </span>
          {hasFilters && (
            <span className={styles.filterNote}>Filtered results</span>
          )}
        </div>

        {/* ─── GRID ─── */}
        {filtered.length > 0 ? (
          <div className="grid-auto stagger" role="list" aria-label="Workshop listings">
            {filtered.map((w, i) => (
              <div key={w.id} role="listitem">
                <WorkshopCard workshop={w} delay={i * 0.06} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty} role="status">
            <div className={styles.emptyIcon} aria-hidden="true">🔍</div>
            <h3>No workshops found</h3>
            <p>Try adjusting your search or filters.</p>
            <button onClick={resetFilters} className={styles.emptyBtn}>Reset all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
