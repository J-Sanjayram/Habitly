import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Command, Zap, User } from 'lucide-react';

export const KeyboardTour = ({ isOpen, onClose, onOpenTracker }) => {
  const modalRef = useRef(null);
  const doneButtonRef = useRef(null);
  const [pressedKey, setPressedKey] = useState(null);
  const [dontShowAgain, setDontShowAgain] = useState(() => {
    try {
      return localStorage.getItem('habitly_guide_seen') === 'true';
    } catch {
      return false;
    }
  });

  const SHORTCUT_CATEGORIES = [
    {
      title: 'Navigation & Flow',
      icon: <Command className="w-4 h-4 text-emerald-500" />,
      items: [
        {
          keys: ['←', '→', '↑', '↓'],
          label: 'Move focus across all buttons & habits',
          keyId: 'arrow',
        },
        {
          keys: ['↵ Enter'],
          label: 'Select focused button / open tracker',
          keyId: 'enter',
        },
        {
          keys: ['Tab'],
          label: 'Cycle forward (Shift+Tab to reverse)',
          keyId: 'tab',
        },
      ],
    },
    {
      title: 'Habit Mastery',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      items: [
        {
          keys: ['Space', 'or', '↵'],
          label: 'Check off habit for today',
          keyId: 'space',
        },
        {
          keys: ['Ctrl', 'K'],
          label: 'Jump directly to habit search',
          keyId: 'k',
        },
        {
          keys: ['Esc'],
          label: 'Close dialogs or clear search',
          keyId: 'escape',
        },
      ],
    },
    {
      title: 'Quick Actions',
      icon: <User className="w-4 h-4 text-teal-500" />,
      items: [
        {
          keys: ['Shift', '↵'],
          label: 'Open profile, photo upload & auth',
          keyId: 'shift+enter',
        },
        {
          keys: ['?'],
          label: 'Show / hide this power user guide',
          keyId: '?',
        },
      ],
    },
  ];

  // Live key press detector for visual feedback on keycaps
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['arrowleft', 'arrowright', 'arrowup', 'arrowdown'].includes(key)) {
        setPressedKey('arrow');
      } else if (e.shiftKey && key === 'enter') {
        setPressedKey('shift+enter');
      } else if (key === 'enter') {
        setPressedKey('enter');
      } else if (key === ' ') {
        setPressedKey('space');
      } else if (key === 'escape') {
        setPressedKey('escape');
        handleClose();
        return;
      } else if (key === 'tab') {
        setPressedKey('tab');
      } else if (key === 'k' && (e.ctrlKey || e.metaKey)) {
        setPressedKey('k');
      } else if (key === '?') {
        setPressedKey('?');
      }

      // Arrow navigation across action buttons inside modal
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        const activeEl = document.activeElement;
        if (activeEl && activeEl.tagName === 'BUTTON' && modalRef.current) {
          const buttons = Array.from(modalRef.current.querySelectorAll('button:not([disabled])'));
          const idx = buttons.indexOf(activeEl);
          if (idx !== -1) {
            e.preventDefault();
            const nextIdx =
              e.key === 'ArrowRight' || e.key === 'ArrowDown'
                ? (idx + 1) % buttons.length
                : (idx - 1 + buttons.length) % buttons.length;
            buttons[nextIdx]?.focus();
          }
        }
      }
    };

    const handleKeyUp = () => {
      setTimeout(() => setPressedKey(null), 250);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        doneButtonRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    try {
      localStorage.setItem('habitly_guide_seen', 'true');
    } catch (e) {
      console.warn(e);
    }
    onClose();
  };

  const handleToggleDontShow = (checked) => {
    setDontShowAgain(checked);
    try {
      if (checked) {
        localStorage.setItem('habitly_guide_seen', 'true');
      } else {
        localStorage.removeItem('habitly_guide_seen');
      }
    } catch (e) {
      console.warn(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="power-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 animate-scale-in flex flex-col"
      >
        {/* Simple & Clean Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 id="power-guide-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Power User Shortcuts
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Master Habitly with zero mouse friction
              </p>
            </div>
          </div>

          <button
            id="power-guide-x-btn"
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean, Simple 3-Category Layout */}
        <div className="mt-5 space-y-4">
          {SHORTCUT_CATEGORIES.map((category, cIdx) => (
            <div key={cIdx} className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                {category.icon}
                <span>{category.title}</span>
              </div>

              <div className="space-y-1.5">
                {category.items.map((item, iIdx) => {
                  const isLit = pressedKey && item.keyId === pressedKey;
                  return (
                    <div
                      key={iIdx}
                      className={`px-3 py-2 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        isLit
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-xs'
                          : 'bg-slate-50/80 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                        {item.label}
                      </span>

                      <div className="flex items-center gap-1 shrink-0 font-mono text-xs">
                        {item.keys.map((k, kIdx) => {
                          if (k === 'or') {
                            return (
                              <span key={kIdx} className="text-[10px] text-slate-400 px-0.5 font-sans">
                                or
                              </span>
                            );
                          }
                          return (
                            <kbd
                              key={kIdx}
                              className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all ${
                                isLit
                                  ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-400/50'
                                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 shadow-2xs'
                              }`}
                            >
                              {k}
                            </kbd>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Clean Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-500 dark:text-slate-400 select-none">
            <input
              type="checkbox"
              id="power-guide-dont-show"
              checked={dontShowAgain}
              onChange={(e) => handleToggleDontShow(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 focus-visible:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Don&apos;t show on startup</span>
          </label>

          <button
            ref={doneButtonRef}
            id="power-guide-done-btn"
            type="button"
            onClick={handleClose}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-sm shadow-emerald-600/30 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span>Got it</span>
            <kbd className="px-1.5 py-0.5 rounded bg-emerald-700/80 text-white font-mono text-[10px]">
              Esc
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
};
