import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { SplashScreen } from './components/common/SplashScreen';
import { KeyboardTour } from './components/common/KeyboardTour';
import { AuthModal } from './components/common/AuthModal';
import { AVATAR_PRESETS } from './data/avatarPresets';
import { LandingPage } from './components/landing/LandingPage';
import { TrackerPage } from './components/tracker/TrackerPage';

const DEFAULT_USER = {
  name: 'Alex Morgan',
  email: 'alex.morgan@habitly.app',
  avatar: AVATAR_PRESETS[0],
  joinedDate: 'Member since Oct 2026',
  isAuthenticated: false,
};

function HabitlyApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [currentView, setCurrentView] = useState(() => {
    // Check hash or default to 'landing'
    if (window.location.hash === '#tracker') {
      return 'tracker';
    }
    return 'landing';
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('habitly_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved user profile:', e);
    }
    return DEFAULT_USER;
  });

  // Sync user profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('habitly_user_profile', JSON.stringify(user));
    } catch (e) {
      console.warn('LocalStorage error saving user:', e);
    }
  }, [user]);

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Automatically trigger keyboard tour after splash screen on desktop screens only (>= 768px)
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setTimeout(() => {
        setShowTour(true);
      }, 150);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    window.location.hash = view === 'tracker' ? '#tracker' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode = 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleAuthSuccess = (authenticatedUser) => {
    if (authenticatedUser) {
      setUser(authenticatedUser);
    }
    handleViewChange('tracker');
  };

  // Global Shortcuts: Shift + Enter for Auth, Enter for Tracker (when on landing)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Shift + Enter: open Sign In / Sign Up
      if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        handleOpenAuth('signup');
        return;
      }

      // Enter on Landing Page: open Tracker dashboard if not inside interactive element or modal
      if (e.key === 'Enter' && !e.shiftKey && currentView === 'landing') {
        const activeTag = document.activeElement?.tagName;
        const isInteractive = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag);
        const isModalOpen = document.querySelector('[role="dialog"]') || showAuth || showSplash || showTour;
        if (!isInteractive && !isModalOpen) {
          e.preventDefault();
          handleViewChange('tracker');
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentView, showAuth, showSplash, showTour]);

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
      {/* Fast & Lightweight Animated Logo Splash Screen */}
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      {/* Interactive Keyboard Accessibility Tour Guide */}
      <KeyboardTour
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        onOpenTracker={() => handleViewChange('tracker')}
      />

      {/* Sign In / Sign Up Modal with Avatar Upload & Image URL */}
      <AuthModal
        isOpen={showAuth}
        initialMode={authMode}
        user={user}
        onClose={() => setShowAuth(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Persistent Navigation Header with User Avatar */}
      <Header
        currentView={currentView}
        user={user}
        onViewChange={handleViewChange}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage
            onOpenTracker={() => handleViewChange('tracker')}
            onOpenAuth={handleOpenAuth}
            isAuthenticated={user?.isAuthenticated}
          />
        ) : (
          <TrackerPage
            user={user}
            onOpenAuth={handleOpenAuth}
            onReplaySplash={() => setShowSplash(true)}
            onOpenTour={() => setShowTour(true)}
          />
        )}
      </main>

      {/* Persistent Accessible Footer */}
      <Footer
        onViewChange={handleViewChange}
        onOpenTour={() => setShowTour(true)}
      />

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
