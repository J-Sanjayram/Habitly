import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const SplashScreen = ({ onFinish }) => {
  const [stage, setStage] = useState('enter'); // 'enter' | 'reveal' | 'exit'
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Stage 1: Reveal logo & wordmark
    const revealTimer = setTimeout(() => {
      setStage('reveal');
    }, 150);

    // Stage 2: Trigger exit fade
    const exitTimer = setTimeout(() => {
      setStage('exit');
    }, 1050);

    // Stage 3: Complete & unmount
    const finishTimer = setTimeout(() => {
      setIsDone(true);
      if (onFinish) onFinish();
    }, 1350);

    // Allow user to skip immediately with Escape or Space
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        setIsDone(true);
        if (onFinish) onFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onFinish]);

  if (isDone) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Habitly loading screen"
      onClick={() => {
        setIsDone(true);
        if (onFinish) onFinish();
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none transition-all duration-300 ease-out ${
        stage === 'exit'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className={`absolute w-80 h-80 rounded-full bg-emerald-500/20 blur-[100px] transition-all duration-700 pointer-events-none ${
          stage === 'reveal' ? 'scale-125 opacity-100' : 'scale-75 opacity-40'
        }`}
        aria-hidden="true"
      />

      {/* Main Logo & Wordmark Unit */}
      <div className="relative flex flex-col items-center">
        {/* Animated Icon Badge */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30 transition-all duration-500 ease-out ${
            stage !== 'enter'
              ? 'scale-100 opacity-100 translate-y-0 rotate-0'
              : 'scale-50 opacity-0 translate-y-4 -rotate-12'
          }`}
        >
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white drop-shadow-md animate-pulse-subtle" />
        </div>

        {/* Brand Wordmark (Plus Jakarta Sans) */}
        <div
          className={`mt-4 sm:mt-5 text-center transition-all duration-500 delay-100 ease-out ${
            stage !== 'enter'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
            Habitly
          </h1>
          <p className="mt-1 text-xs sm:text-sm font-medium tracking-wide text-slate-400">
            Master your daily rituals
          </p>
        </div>

        {/* Lightweight Progress Bar */}
        <div className="w-36 sm:w-44 h-1 bg-slate-800 rounded-full overflow-hidden mt-6">
          <div
            className={`h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full transition-all duration-700 ease-out ${
              stage === 'reveal' || stage === 'exit' ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>

      {/* Quick Skip Hint */}
      <div
        className={`absolute bottom-6 text-[11px] font-medium text-slate-500 transition-opacity duration-300 ${
          stage === 'reveal' ? 'opacity-70' : 'opacity-0'
        }`}
      >
        Click or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">Esc</kbd> to enter
      </div>
    </div>
  );
};
