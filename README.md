# FOSSEE Workshop Booking – React UI/UX Redesign

A complete redesign of the [FOSSEE Workshop Booking Portal](https://github.com/FOSSEE/workshop_booking) using React. The original Django-based site was analysed for structure and functionality, then rebuilt from scratch as a modern, mobile-first, accessible React frontend.

---

## Live Preview

> Clone and run locally (see Setup below). No deployed URL — this is a frontend-only redesign meant to be integrated with the existing Django backend API.

---

##  Project Structure

```
fossee-workshop-booking/
├── public/
│   └── index.html               # SEO meta tags, OG tags, font preloads
├── src/
│   ├── index.js                 # React entry point
│   ├── index.css                # Global design tokens, animations, utilities
│   ├── App.jsx                  # Router with lazy-loaded pages
│   ├── utils/
│   │   └── mockData.js          # Workshop data (replace with API calls)
│   └── components/
│       ├── layout/
│       │   ├── Navbar.jsx / .module.css      # Responsive sticky navbar
│       │   └── Footer.jsx / .module.css      # Multi-column footer
│       ├── ui/
│       │   ├── WorkshopCard.jsx / .module.css  # Reusable workshop card
│       │   ├── PageLoader.jsx               # Suspense fallback spinner
│       │   └── ScrollToTop.jsx              # Route-change scroll reset
│       └── pages/
│           ├── HomePage.jsx / .module.css   # Hero, stats, workshops, testimonials
│           ├── WorkshopsPage.jsx / .module.css  # Filterable workshop list
│           ├── BookingPage.jsx / .module.css    # Multi-step booking form
│           ├── LoginPage.jsx                    # Auth form
│           ├── RegisterPage.jsx                 # Registration form
│           ├── AuthPage.module.css              # Shared auth styles
│           ├── DashboardPage.jsx / .module.css  # User dashboard
│           ├── AboutPage.jsx / .module.css      # Mission, FAQ, contact
│           └── NotFoundPage.jsx / .module.css   # 404 page
```

---

##  Setup Instructions

### Prerequisites
- Node.js v18+ 
- npm v9+

### Installation

```bash
# 1. Clone this repository
git clone https://github.com/YOUR_USERNAME/fossee-workshop-booking-react
cd fossee-workshop-booking

# 2. Install dependencies
npm install

# 3. Start development server
npm start
# → Opens at http://localhost:3000

# 4. Build for production
npm run build
```

### Connecting to the Django Backend

Replace the mock data in `src/utils/mockData.js` with real API calls:

```js
// Example: fetch workshops from the Django API
const response = await fetch('/api/workshops/');
const data = await response.json();
```

Update the form submission handlers in `BookingPage.jsx`, `LoginPage.jsx`, and `RegisterPage.jsx` to POST to the actual Django endpoints.

---

## Design Principles

### 1. Industrial-Academic Aesthetic
The design commits to a **dark navy base with electric amber accents** — referencing the serious, technical nature of engineering education while remaining approachable. The typography pairs `Space Mono` (headers, numbers, badges) for precision and identity with `DM Sans` (body) for warmth and readability. This combination avoids generic "AI slop" aesthetics and feels genuinely designed for a technical audience.

### 2. Visual Hierarchy First
Every page is structured to answer one question immediately: *what matters most here?* The homepage hero communicates the core value proposition within 3 seconds. Workshop cards prioritise title → level/mode → seat availability → CTA — the natural decision sequence for a student.

### 3. Progressive Disclosure
Complex flows (like booking) are broken into steps. The multi-step booking form (Details → Confirm → Done) reduces cognitive load, lowers abandonment, and gives users a sense of progress and control.

### 4. Accessibility as a Baseline, Not an Afterthought
- Semantic HTML throughout (`<article>`, `<section>`, `<nav>`, `<dl>`, `<aside>`)
- `aria-label`, `aria-live`, `aria-expanded`, `role` attributes on interactive elements
- `:focus-visible` styles for keyboard navigation
- Color contrast ratios meet WCAG AA
- Form fields have associated `<label>` and `aria-describedby` for errors
- Screen-reader-only text (`.sr-only`) where icon-only UI elements are used

---

##  Responsiveness Strategy

The entire design is **mobile-first** — base styles target small screens, `@media (min-width: ...)` queries add desktop enhancements.

| Breakpoint | Strategy |
|---|---|
| < 480px | Single column. Touch-optimised tap targets (min 44×44px). Hamburger nav. |
| 480–768px | 2-column grids unlock. Logo subtext appears. |
| 768px+ | Desktop nav, auth buttons, and multi-column layouts activate. |
| 900px+ | Booking page sidebar appears beside form. |
| 1024px+ | Footer uses 4-column layout. |

Key techniques:
- `clamp()` for fluid typography that scales between breakpoints without breakpoints
- `repeat(auto-fill, minmax(..., 1fr))` for intrinsically responsive grids
- CSS `position: sticky` for the navbar and booking sidebar — no JS required
- `backdrop-filter: blur()` for the glassmorphic navbar with hardware acceleration
- Mobile menu uses `position: fixed` overlay with body scroll lock, keyboard accessible

---

## Performance Trade-offs

| Decision | Trade-off |
|---|---|
| **Route-based code splitting** via `React.lazy` + `Suspense` | Slightly longer first-paint for non-home pages, but drastically reduces initial bundle size |
| **Google Fonts via `<link>` preconnect** | Adds a small network request, but fonts load asynchronously and never block rendering |
| **CSS Modules** for all components | Slightly more files, zero runtime overhead, no CSS-in-JS hydration cost |
| **No animation library** — pure CSS animations | Saves ~50–80KB (Framer Motion), uses GPU-composited `transform`/`opacity` properties only |
| **No icon library SVG imports** — inline SVG/emoji for common icons | Avoids tree-shaking complexity; icons are few and simple in this app |
| **Mock data in JS module** | Instant render during dev; swap with `useEffect`/`fetch` in production |

All animations use only `transform` and `opacity` — the two CSS properties that trigger GPU compositing and never cause layout reflow.

---

##  Most Challenging Part

**The multi-step booking form with accessible error handling** was the most complex component to build well.

The challenges were:
1. **State management across steps** — form data, validation errors, and loading state all needed to persist across the three steps without prop drilling, solved with local `useState` at the page level.
2. **Validation UX** — showing errors only after submission attempts, clearing per-field errors on change, and making errors screen-reader-accessible via `role="alert"` and `aria-describedby`.
3. **Mobile sidebar** — the workshop summary sidebar needed to be sticky on desktop but flow naturally (above the form) on mobile without JavaScript, achieved through CSS Grid `column-order` and `@media` queries.
4. **Preventing double-submission** — the confirm button disables itself and shows a spinner during the simulated API call, preventing multiple clicks.

---

## Before / After

### Before (Original Django Site)
- Minimal Bootstrap-based layout
- No responsive navigation
- Plain HTML forms with no real-time validation
- No visual hierarchy or branding
- Functional but visually dated

### After (React Redesign)
- Dark industrial-academic theme with consistent design tokens
- Mobile-first responsive layout with animated hamburger menu
- Multi-step booking flow with real-time validation and accessibility
- Workshop cards with seat availability progress bars
- Hero with animated statistics, testimonials section, and CTA banners
- Accessible color system, keyboard navigation, ARIA attributes throughout
- Route-based code splitting for fast initial load
- SEO meta tags, Open Graph, and Twitter Card support


---


