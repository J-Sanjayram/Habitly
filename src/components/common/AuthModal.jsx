import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const modalRef = useRef(null);
  const emailInputRef = useRef(null);
  const buttonsRef = useRef([]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Focus trap, Escape close, and Arrow Key navigation across buttons
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setErrors({});

      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        // Focus trap inside modal
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll(
            'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }

        // Arrow Key navigation between action buttons
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
          const activeEl = document.activeElement;
          const isButton = activeEl && activeEl.tagName === 'BUTTON';

          if (isButton && modalRef.current) {
            const allButtons = Array.from(modalRef.current.querySelectorAll('button:not([disabled])'));
            const currentIndex = allButtons.indexOf(activeEl);

            if (currentIndex !== -1) {
              e.preventDefault();
              let nextIndex;
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % allButtons.length;
              } else {
                nextIndex = (currentIndex - 1 + allButtons.length) % allButtons.length;
              }
              allButtons[nextIndex]?.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim() || !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (mode === 'signup' && !name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Successful Auth
    showToast({
      message: mode === 'signup' ? `Welcome to Habitly, ${name || 'User'}! 🚀` : 'Welcome back! Signed in successfully.',
      type: 'success',
    });
    onClose();
    if (onAuthSuccess) onAuthSuccess();
  };

  const handleGuestLogin = () => {
    showToast({
      message: 'Signed in as Demo Guest! Loading habits dashboard...',
      type: 'success',
    });
    onClose();
    if (onAuthSuccess) onAuthSuccess();
  };

  const handleInputKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentField === 'name') {
        document.getElementById('auth-email')?.focus();
      } else if (currentField === 'email') {
        document.getElementById('auth-password')?.focus();
      } else if (currentField === 'password') {
        handleSubmit(e);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentField === 'name') {
        document.getElementById('auth-email')?.focus();
      } else if (currentField === 'email') {
        document.getElementById('auth-password')?.focus();
      } else if (currentField === 'password') {
        document.getElementById('auth-submit-btn')?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentField === 'password') {
        document.getElementById('auth-email')?.focus();
      } else if (currentField === 'email') {
        if (mode === 'signup') {
          document.getElementById('auth-name')?.focus();
        } else {
          document.getElementById('auth-tab-login')?.focus();
        }
      } else if (currentField === 'name') {
        document.getElementById('auth-tab-signup')?.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shift + Enter Shortcut</span>
            </div>
            <h2 id="auth-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
              {mode === 'login' ? 'Sign In to Habitly' : 'Create Your Free Account'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="mt-5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-1">
          <button
            id="auth-tab-login"
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            id="auth-tab-signup"
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              mode === 'signup'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
          {mode === 'signup' && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, 'name')}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                ref={emailInputRef}
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleInputKeyDown(e, 'email')}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleInputKeyDown(e, 'password')}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>
            {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-md shadow-emerald-600/20 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>{mode === 'login' ? 'Sign In & Open Tracker' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="auth-guest-btn"
              type="button"
              onClick={handleGuestLogin}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>Instant Guest Login (Open Dashboard)</span>
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">← / → Arrow keys</kbd>
          <span>to move between buttons</span>
        </p>
      </div>
    </div>
  );
};

