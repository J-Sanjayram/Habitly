import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Mail, User, ArrowRight, Sparkles, Camera, Upload, Link as LinkIcon } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { AVATAR_PRESETS } from '../../data/avatarPresets';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess, initialMode = 'signup', user }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarMode, setAvatarMode] = useState('upload'); // 'upload' | 'url'
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const modalRef = useRef(null);
  const emailInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Reset or initialize form fields on open
  useEffect(() => {
    if (isOpen) {
      setEmail(user?.email || '');
      setPassword('');
      setName(user?.name || '');
      setAvatar(user?.avatar || AVATAR_PRESETS[0]);
      setErrors({});

      setTimeout(() => {
        if (mode === 'signup') {
          document.getElementById('auth-name')?.focus();
        } else {
          emailInputRef.current?.focus();
        }
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
  }, [isOpen, onClose, user, mode]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, avatar: 'Please select a valid image file (PNG, JPG, WebP)' }));
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, avatar: 'Image size should be less than 3MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.avatar;
        return next;
      });
      showToast({ message: 'Profile photo uploaded! 📸', type: 'success', duration: 2500 });
    };
    reader.readAsDataURL(file);
  };

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

    const authenticatedUser = {
      name: name.trim() || 'Alex Morgan',
      email: email.trim() || 'alex.morgan@habitly.app',
      avatar: avatar.trim() || AVATAR_PRESETS[0],
      joinedDate: user?.joinedDate || 'Member since Today',
    };

    // Successful Auth
    showToast({
      message: mode === 'signup' ? `Welcome to Habitly, ${authenticatedUser.name}! 🚀` : `Welcome back, ${authenticatedUser.name}!`,
      type: 'success',
    });
    onClose();
    if (onAuthSuccess) onAuthSuccess(authenticatedUser);
  };

  const handleGuestLogin = () => {
    const guestUser = {
      name: 'Alex Morgan',
      email: 'alex.morgan@habitly.app',
      avatar: AVATAR_PRESETS[0],
      joinedDate: 'Demo Account',
    };
    showToast({
      message: 'Signed in as Demo Guest! Loading habits dashboard...',
      type: 'success',
    });
    onClose();
    if (onAuthSuccess) onAuthSuccess(guestUser);
  };

  const handleInputKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentField === 'name') {
        if (avatarMode === 'url') {
          document.getElementById('auth-avatar-url')?.focus() || document.getElementById('auth-email')?.focus();
        } else {
          document.getElementById('auth-email')?.focus();
        }
      } else if (currentField === 'avatarUrl') {
        document.getElementById('auth-email')?.focus();
      } else if (currentField === 'email') {
        document.getElementById('auth-password')?.focus();
      } else if (currentField === 'password') {
        handleSubmit(e);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentField === 'name') {
        if (avatarMode === 'url') {
          document.getElementById('auth-avatar-url')?.focus() || document.getElementById('auth-email')?.focus();
        } else {
          document.getElementById('auth-email')?.focus();
        }
      } else if (currentField === 'avatarUrl') {
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
          if (avatarMode === 'url') {
            document.getElementById('auth-avatar-url')?.focus() || document.getElementById('auth-name')?.focus();
          } else {
            document.getElementById('auth-name')?.focus();
          }
        } else {
          document.getElementById('auth-tab-login')?.focus();
        }
      } else if (currentField === 'avatarUrl') {
        document.getElementById('auth-name')?.focus();
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
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl animate-scale-in max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-1">
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
        <div className="mt-4 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-1">
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
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5" noValidate>
          {mode === 'signup' && (
            <>
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
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              {/* Profile Photo Option (Upload File / Image URL) */}
              <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Profile Picture
                  </span>
                  
                  {/* Mode switcher: Upload vs URL */}
                  <div className="flex items-center gap-1 p-0.5 bg-slate-200/80 dark:bg-slate-700 rounded-lg text-[11px]">
                    <button
                      type="button"
                      id="auth-avatar-mode-upload"
                      onClick={() => setAvatarMode('upload')}
                      className={`px-2 py-0.5 rounded-md font-medium transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        avatarMode === 'upload'
                          ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      id="auth-avatar-mode-url"
                      onClick={() => setAvatarMode('url')}
                      className={`px-2 py-0.5 rounded-md font-medium transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        avatarMode === 'url'
                          ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Live circular avatar preview */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full ring-2 ring-emerald-500/50 overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-inner">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = AVATAR_PRESETS[0];
                          }}
                        />
                      ) : (
                        <User className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    {avatar && (
                      <button
                        type="button"
                        onClick={() => setAvatar('')}
                        title="Remove profile image"
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] hover:bg-rose-600 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
                        aria-label="Remove image"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Input controls */}
                  <div className="flex-1 min-w-0">
                    {avatarMode === 'upload' ? (
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="auth-avatar-file-input"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        <button
                          type="button"
                          id="auth-avatar-upload-btn"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-2xs"
                        >
                          <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Choose Image File</span>
                        </button>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate">
                          PNG, JPG, WebP up to 3MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="relative">
                          <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
                          <input
                            id="auth-avatar-url"
                            type="url"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            onKeyDown={(e) => handleInputKeyDown(e, 'avatarUrl')}
                            placeholder="https://... image URL"
                            className="w-full pl-8 pr-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate">
                          Direct online picture link
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preset Avatars Row */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    Or select avatar:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {AVATAR_PRESETS.map((presetUrl, idx) => (
                      <button
                        key={idx}
                        id={`auth-avatar-preset-${idx}`}
                        type="button"
                        onClick={() => setAvatar(presetUrl)}
                        className={`w-6 h-6 rounded-full overflow-hidden transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                          avatar === presetUrl
                            ? 'ring-2 ring-emerald-500 scale-110 shadow-xs'
                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                        title={`Select preset ${idx + 1}`}
                      >
                        <img src={presetUrl} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {errors.avatar && <p className="text-xs text-rose-500 mt-1.5">{errors.avatar}</p>}
              </div>
            </>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                ref={emailInputRef}
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleInputKeyDown(e, 'email')}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleInputKeyDown(e, 'password')}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>
            {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
          </div>

          <div className="pt-2 space-y-2">
            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-md shadow-emerald-600/20 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>{mode === 'login' ? 'Sign In & Open Tracker' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="auth-guest-btn"
              type="button"
              onClick={handleGuestLogin}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>Instant Guest Login (Open Dashboard)</span>
            </button>
          </div>
        </form>

        <p className="mt-3 hidden md:flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">← / → Arrow keys</kbd>
          <span>to move between buttons</span>
        </p>
      </div>
    </div>
  );
};
