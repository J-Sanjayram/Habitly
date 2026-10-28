import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Sun, Moon, Menu, X, ArrowRight, LayoutDashboard, Home } from 'lucide-react';

export const Header = ({ currentView, onViewChange }) => {
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-900 dark:text-white rounded-lg focus-visible:ring-2 focus-visible:ring-emerald-500 z-10"
          aria-label="Habitly home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
            Habitly
          </span>
        </button>

        {/* Desktop Navigation Links (Centered on Laptop/Desktop, Flow on Tablet) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-5 lg:gap-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          {currentView === 'landing' ? (
            <>
              <button
                type="button"
                onClick={() => handleNavClick('landing', 'features')}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Features
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('landing', 'testimonials')}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Testimonials
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('landing', 'pricing')}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Pricing
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => handleNavClick('landing')}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Home className="w-4 h-4" />
              <span>Back to Landing Page</span>
            </button>
          )}
        </nav>

        {/* Actions (Theme Toggle + Mode Switcher / Sign Up) */}
        <div className="hidden md:flex items-center gap-2.5 lg:gap-3 z-10">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 shrink-0"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>

          {currentView === 'landing' ? (
            <button
              type="button"
              onClick={() => onViewChange('tracker')}
              className="inline-flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-sm shadow-emerald-600/30 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap"
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">Open Habit Tracker</span>
              <span className="lg:hidden">Tracker</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onViewChange('landing')}
              className="inline-flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap"
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
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 pt-2 pb-6 space-y-3 animate-fade-in">
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
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
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

