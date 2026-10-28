import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LandingPage } from './components/landing/LandingPage';
import { TrackerPage } from './components/tracker/TrackerPage';

function HabitlyApp() {
  const [currentView, setCurrentView] = useState(() => {
    // Check hash or default to 'landing'
    if (window.location.hash === '#tracker') {
      return 'tracker';
    }
    return 'landing';
  });

  const handleViewChange = (view) => {
    setCurrentView(view);
    window.location.hash = view === 'tracker' ? '#tracker' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#tracker') {
        setCurrentView('tracker');
      } else if (window.location.hash === '' || window.location.hash === '#landing') {
        setCurrentView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Persistent Navigation Header */}
      <Header currentView={currentView} onViewChange={handleViewChange} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage onOpenTracker={() => handleViewChange('tracker')} />
        ) : (
          <TrackerPage />
        )}
      </main>

      {/* Persistent Accessible Footer */}
      <Footer onViewChange={handleViewChange} />

      {/* Notification Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <HabitlyApp />
      </ToastProvider>
    </ThemeProvider>
  );
}
