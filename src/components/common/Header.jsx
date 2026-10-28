import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Sun, Moon, Menu, X, ArrowRight, LayoutDashboard, Home, User } from 'lucide-react';

export const Header = ({ currentView, onViewChange, onOpenAuth, onOpenTour, user }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view, sectionId) => {
    setMobileMenuOpen(false);
    if (view !== currentView) {
      onViewChange(view);
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo & Navigation Links */}
        <div className="flex items-center gap-6 xl:gap-8 min-w-0">
          <button
            id="nav-brand-logo"
            type="button"
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 group shrink-0"
            aria-label="Habitly home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
            <span className="font-display font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300 bg-clip-text text-transparent dark:text-transparent">
              Habitly
            </span>
          </button>

          {/* Desktop Navigation Links (Flows naturally without absolute positioning overlap) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6"
          >
            {currentView === 'landing' ? (
              <>
                <button
                  id="nav-link-features"
                  type="button"
                  onClick={() => handleNavClick('landing', 'features')}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap"
                >
                  Features
                </button>
                <button
                  id="nav-link-testimonials"
                  type="button"
                  onClick={() => handleNavClick('landing', 'testimonials')}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap"
                >
                  Testimonials
                </button>
                <button
                  id="nav-link-pricing"
                  type="button"
                  onClick={() => handleNavClick('landing', 'pricing')}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap"
                >
                  Pricing
                </button>
              </>
            ) : (
              <button
                id="nav-link-landing"
                type="button"
                onClick={() => handleNavClick('landing')}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap"
              >
                <Home className="w-4 h-4" />
                <span>Back to Landing Page</span>
              </button>
            )}
          </nav>
        </div>

        {/* Actions (User Avatar Chip / Sign In + Theme Toggle + Mode Switcher) */}
        <div className="hidden md:flex items-center gap-2 lg:gap-2.5 shrink-0 z-10">
          {/* User Profile / Auth Trigger */}
          {onOpenAuth && (
            user?.isAuthenticated ? (
              <button
                id="nav-auth-btn"
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:border-slate-300 dark:border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap shadow-xs group"
                title="Profile Settings & Photo (Shortcut: Shift + Enter)"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User avatar'}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-500/60"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <User className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
                <span className="max-w-[95px] truncate font-medium">
                  {user?.name ? user.name.split(' ')[0] : 'Profile'}
                </span>
                <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 shadow-2xs">
                  Shift+Enter
                </kbd>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-signin-btn"
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Sign In
                </button>
                <button
                  id="nav-signup-btn"
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:border-slate-300 dark:border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-2xs"
                  title="Create Free Account (Shortcut: Shift + Enter)"
                >
                  <span>Sign Up</span>
                  <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 shadow-2xs">
                    Shift+Enter
                  </kbd>
                </button>
              </div>
            )
          )}

          {/* Power User Shortcuts Trigger */}
          {onOpenTour && (
            <button
              id="nav-shortcuts-btn"
              type="button"
              onClick={onOpenTour}
              className="p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 shrink-0 group"
              title="Power User Guide & Shortcuts (Press ?)"
              aria-label="Open Keyboard Shortcuts Guide"
            >
              <kbd className="w-6 h-6 flex items-center justify-center font-mono text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:border-emerald-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shadow-2xs transition-colors">
                ?
              </kbd>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            id="nav-theme-toggle"
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 shrink-0"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>

          {currentView === 'landing' ? (
            <button
              id="nav-tracker-btn"
              type="button"
              onClick={() => onViewChange('tracker')}
              className="inline-flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-sm shadow-emerald-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap"
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">Open Habit Tracker</span>
              <span className="lg:hidden">Tracker</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          ) : (
            <button
              id="nav-landing-btn"
              type="button"
              onClick={() => onViewChange('landing')}
              className="inline-flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap"
            >
              <Home className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">Landing Page</span>
              <span className="lg:hidden">Landing</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2 z-10">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          {/* User profile card or Auth buttons on mobile */}
          {user?.isAuthenticated ? (
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                </div>
              </div>

              {onOpenAuth && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  Edit Photo
                </button>
              )}
            </div>
          ) : (
            onOpenAuth && (
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2 px-3 text-center rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2 px-3 text-center rounded-xl text-xs font-semibold text-white bg-emerald-600"
                >
                  Create Account
                </button>
              </div>
            )
          )}

          {currentView === 'landing' ? (
            <>
              <button
                type="button"
                onClick={() => handleNavClick('landing', 'features')}
                className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                Features
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('landing', 'testimonials')}
                className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                Testimonials
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('landing', 'pricing')}
                className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                Pricing
              </button>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onViewChange('tracker');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Launch Habit Tracker</span>
                </button>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onViewChange('landing');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              <Home className="w-4 h-4" />
              <span>Back to Landing Page</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
