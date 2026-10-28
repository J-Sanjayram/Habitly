import React from 'react';
import { Sparkles, Heart, Keyboard, CheckCircle2 } from 'lucide-react';

export const Footer = ({ onViewChange }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 fill-white" />
              </div>
              <span>Habitly</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Designed for intentional living. Habitly replaces guilt-driven productivity with a simple, calm, science-backed habit tracking system that helps you stay consistent.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>WCAG 2.1 AA Compliant &amp; Keyboard Accessible</span>
            </div>
          </div>

          {/* Quick navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('tracker')}
                  className="hover:text-emerald-400 transition-colors focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  My Habits Tracker
                </button>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-emerald-400 transition-colors focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-emerald-400 transition-colors focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Pricing Plans
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-emerald-400 transition-colors focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  User Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Accessibility & Shortcuts */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-emerald-400" />
              <span>Accessibility</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Tab</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Shift+Tab</kbd> Full navigation
              </li>
              <li>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Enter</kbd> Check habit
              </li>
              <li>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Esc</kbd> Close modal dialog
              </li>
              <li>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Ctrl/Cmd + K</kbd> Focus search
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Habitly Technologies, Inc. Built for mindful habits.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for purposeful users.
          </p>
        </div>
      </div>
    </footer>
  );
};
