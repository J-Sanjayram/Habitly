import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Search, Sliders, Check, ArrowRight, LayoutDashboard, Zap, Command, CheckCircle2 } from 'lucide-react';

export const KeyboardTour = ({ isOpen, onClose, onOpenTracker }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [pressedKey, setPressedKey] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [dontShowAgain, setDontShowAgain] = useState(() => {
    try {
      return localStorage.getItem('habitly_guide_seen') === 'true';
    } catch {
      return false;
    }
  });

  const SHORTCUT_GROUPS = [
    {
      title: 'Global & Navigation',
      icon: <Command className="w-4 h-4 text-emerald-500" />,
      shortcuts: [
        {
          keys: ['←', '→', '↑', '↓'],
          action: 'Navigate between buttons, filters & habits',
          badge: 'Flow',
          keyId: 'arrow',
        },
        {
          keys: ['Enter'],
          action: 'Open tracker or activate focused button',
          badge: 'Confirm',
          keyId: 'enter',
        },
        {
          keys: ['Tab', 'Shift+Tab'],
          action: 'Cycle forward / backward across interactive elements',
          badge: 'A11y',
          keyId: 'tab',
        },
        {
          keys: ['?'],
          action: 'Toggle this Power User Guide anywhere',
          badge: 'Help',
          keyId: '?',
        },
      ],
    },
    {
      title: 'Habit Mastery & Tracking',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      shortcuts: [
        {
          keys: ['Space', 'or', 'Enter'],
          action: 'Toggle habit complete / incomplete for today',
          badge: 'Streak',
          keyId: 'space',
        },
        {
          keys: ['Ctrl', 'K'],
          action: 'Jump directly to habit search input',
          badge: 'Speed',
          keyId: 'k',
        },
        {
          keys: ['Esc'],
          action: 'Close open dialogs, menus, or clear search',
          badge: 'Dismiss',
          keyId: 'escape',
        },
      ],
    },
    {
      title: 'Profile & Actions',
      icon: <Sliders className="w-4 h-4 text-teal-500" />,
      shortcuts: [
        {
          keys: ['Shift', 'Enter'],
          action: 'Open Profile, Photo Upload & Sign In modal',
          badge: 'Account',
          keyId: 'shift+enter',
        },
        {
          keys: ['←', '→'],
          action: 'Switch between category tabs (Health, Fitness, etc.)',
          badge: 'Filter',
          keyId: 'arrow',
        },
      ],
    },
  ];

  // Handle live key press detection to light up keycaps on screen
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Normalize key for visual feedback
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

      // Arrow navigation between buttons inside modal
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        const activeEl = document.activeElement;
        const isInteractive = activeEl && (activeEl.tagName === 'BUTTON' || activeEl.tagName === 'INPUT');
        if (isInteractive && modalRef.current) {
          const focusable = Array.from(
            modalRef.current.querySelectorAll('button:not([disabled]), input:not([disabled])')
          );
          const currentIndex = focusable.indexOf(activeEl);
          if (currentIndex !== -1) {
            e.preventDefault();
            let nextIndex;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
              nextIndex = (currentIndex + 1) % focusable.length;
            } else {
              nextIndex = (currentIndex - 1 + focusable.length) % focusable.length;
            }
            focusable[nextIndex]?.focus();
          }
        }
      }
    };

    const handleKeyUp = () => {
      setTimeout(() => setPressedKey(null), 300);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen]);

  // Focus management on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
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

  const handleActionOpenTracker = () => {
    handleClose();
    if (onOpenTracker) {
      onOpenTracker();
    }
  };

  if (!isOpen) return null;

  // Filter groups if search term entered
  const filteredGroups = SHORTCUT_GROUPS.map((group) => {
    if (!filterQuery.trim()) return group;
    const q = filterQuery.toLowerCase().trim();
    const filteredShortcuts = group.shortcuts.filter(
      (s) =>
        s.action.toLowerCase().includes(q) ||
        s.badge.toLowerCase().includes(q) ||
        s.keys.some((k) => k.toLowerCase().includes(q))
    );
    return { ...group, shortcuts: filteredShortcuts };
  }).filter((group) => group.shortcuts.length > 0);

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
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 animate-scale-in flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="power-guide-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  Power User Guide
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-3 h-3" />
                  100% Keyboard Flow
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Navigate Habitly at lightning speed with zero mouse friction. Press <kbd className="px-1.5 py-0.5 font-mono text-[11px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-2xs">?</kbd> anywhere to reopen.
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            id="power-guide-close-btn"
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Filter / Search Shortcuts Bar */}
        <div className="mt-4 mb-2 relative shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            id="power-guide-search"
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Type to filter shortcuts (e.g. search, complete, navigate)..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
          />
          {filterQuery && (
            <button
              type="button"
              onClick={() => setFilterQuery('')}
              className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Shortcut Groups Grid (Scrollable) */}
        <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-4">
          {filteredGroups.length === 0 ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-xs">
              No shortcuts found matching &quot;{filterQuery}&quot;. Try typing &quot;arrow&quot; or &quot;enter&quot;.
            </div>
          ) : (
            filteredGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  {group.icon}
                  <span>{group.title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.shortcuts.map((shortcut, sIdx) => {
                    const isLit = pressedKey && shortcut.keyId === pressedKey;
                    return (
                      <div
                        key={sIdx}
                        className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          isLit
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-sm scale-[1.01]'
                            : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100/70 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {shortcut.action}
                          </p>
                          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                            {shortcut.badge}
                          </span>
                        </div>

                        {/* Interactive Keycaps */}
                        <div className="flex items-center gap-1 shrink-0">
                          {shortcut.keys.map((k, kIdx) => {
                            if (k === 'or') {
                              return (
                                <span key={kIdx} className="text-[10px] text-slate-400 px-0.5">
                                  or
                                </span>
                              );
                            }
                            return (
                              <kbd
                                key={kIdx}
                                className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold border transition-all ${
                                  isLit
                                    ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-400/50 shadow-sm'
                                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 shadow-2xs'
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
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-500 dark:text-slate-400 select-none">
            <input
              type="checkbox"
              id="power-guide-dont-show"
              checked={dontShowAgain}
              onChange={(e) => handleToggleDontShow(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 focus-visible:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Don&apos;t auto-show on startup</span>
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenTracker && (
              <button
                id="power-guide-tracker-btn"
                type="button"
                onClick={handleActionOpenTracker}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Open Tracker</span>
              </button>
            )}

            <button
              id="power-guide-done-btn"
              type="button"
              onClick={handleClose}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-sm shadow-emerald-600/30 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>Got it</span>
              <kbd className="px-1.5 py-0.5 rounded bg-emerald-700 text-white font-mono text-[10px]">
                Esc
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
