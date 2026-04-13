import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import PageLoader from './components/ui/PageLoader';

// Lazy-loaded pages for code splitting (performance)
const HomePage       = lazy(() => import('./components/pages/HomePage'));
const WorkshopsPage  = lazy(() => import('./components/pages/WorkshopsPage'));
const BookingPage    = lazy(() => import('./components/pages/BookingPage'));
const LoginPage      = lazy(() => import('./components/pages/LoginPage'));
const RegisterPage   = lazy(() => import('./components/pages/RegisterPage'));
const DashboardPage  = lazy(() => import('./components/pages/DashboardPage'));
const AboutPage      = lazy(() => import('./components/pages/AboutPage'));
const NotFoundPage   = lazy(() => import('./components/pages/NotFoundPage'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"              element={<HomePage />} />
              <Route path="/workshops"     element={<WorkshopsPage />} />
              <Route path="/book/:id"      element={<BookingPage />} />
              <Route path="/login"         element={<LoginPage />} />
              <Route path="/register"      element={<RegisterPage />} />
              <Route path="/dashboard"     element={<DashboardPage />} />
              <Route path="/about"         element={<AboutPage />} />
              <Route path="*"             element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
