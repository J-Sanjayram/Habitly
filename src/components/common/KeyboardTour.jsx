import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, Check, ArrowRight, X, Sparkles, Search, Sliders, CornerDownLeft } from 'lucide-react';

export const KeyboardTour = ({ isOpen, onClose, onOpenTracker }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const modalRef = useRef(null);
  const primaryButtonRef = useRef(null);

  const steps = [
    {
      title: "Welcome to Keyboard-First Habitly",
      subtitle: "Designed for blazing fast, 100% mouse-free habit mastery.",
      badge: "Power User Guide",
      icon: <Keyboard className="w-6 h-6 text-emerald-500" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Every screen, modal, and action in Habitly is engineered to adhere to strict <strong>WCAG 2.1 AA</strong> standards with visible focus rings and zero keyboard traps.
          </p>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-xs text-emerald-900 dark:text-emerald-200">
              <span className="font-bold">Zero mouse needed:</span> Navigate effortlessly using standard keys.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Core Navigation & Shortcuts",
      subtitle: "The 3 most essential shortcuts to keep you in flow.",
      badge: "Speed Shortcuts",
      icon: <Search className="w-6 h-6 text-indigo-500" />,
      content: (
        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Jump directly to search
            </span>
            <div className="flex items-center gap-1 font-mono text-xs">
              <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold shadow-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold shadow-xs">K</kbd>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Check off habit / Toggle
            </span>
            <div className="flex items-center gap-1 font-mono text-xs">
              <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold shadow-xs">Space</kbd>
              <span className="text-slate-400">or</span>
              <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold shadow-xs">Enter</kbd>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Dismiss modals / Clear search
            </span>
            <kbd className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-xs font-bold shadow-xs">
              Esc
            </kbd>
          </div>
        </div>
      ),
    },
    {
      title: "Tab Navigation & Categories",
      subtitle: "Fluid cycling and arrow key selection.",
      badge: "Power Flow",
      icon: <Sliders className="w-6 h-6 text-amber-500" />,
      content: (
        <div className="space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Use <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono">Tab</kbd> to cycle forward and <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono">Shift+Tab</kbd> to cycle back.
          </p>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              Arrow Key Category Switching:
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono font-bold">←</kbd>
              <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono font-bold">→</kbd>
              <span>Switch between Health, Productivity, and Mindfulness tabs.</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Auto focus button and trap focus inside modal
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setTimeout(() => {
        primaryButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        // Focus trap
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      if (onOpenTracker) {
        onOpenTracker();
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleDirectOpenTracker = () => {
    onClose();
    if (onOpenTracker) {
      onOpenTracker();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl animate-scale-in flex flex-col justify-between"
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {step.badge}
              </span>
              <span className="text-xs text-slate-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Skip tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              {step.icon}
            </div>
            <div>
              <h2 id="tour-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {step.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {step.subtitle}
              </p>
            </div>
          </div>

          {/* Step Dynamic Content */}
          <div className="py-2 min-h-[140px]">{step.content}</div>
        </div>

        {/* Footer Actions & Step Dots */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          {/* Step Indicator Dots */}
          <div className="flex items-center gap-1.5" aria-label={`Step ${currentStep + 1} of 3`}>
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all focus-visible:ring-1 focus-visible:ring-emerald-500 ${
                  idx === currentStep ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-200 dark:bg-slate-700'
                }`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!isLastStep && (
              <button
                type="button"
                onClick={handleDirectOpenTracker}
                className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                title="Skip tour and open tracker dashboard"
              >
                Skip to Dashboard
              </button>
            )}
            <button
              ref={primaryButtonRef}
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-sm shadow-emerald-600/30 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>{isLastStep ? "Enter Tracker Dashboard" : "Next Tip"}</span>
              <kbd className="inline-block px-1.5 py-0.5 text-[10px] rounded bg-emerald-700/90 text-white font-mono font-bold">
                ↵ Enter
              </kbd>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

