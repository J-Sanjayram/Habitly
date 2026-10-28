import React, { useState } from 'react';
import { ArrowRight, Flame, CheckCircle, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Hero = ({ onGetStarted }) => {
  const [demoChecked, setDemoChecked] = useState(false);

  const handleDemoToggle = () => {
    const nextState = !demoChecked;
    setDemoChecked(nextState);
    if (nextState) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#34d399', '#6366f1'],
      });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300   animate-fade-in">

            <span>The Mindful Habit Operating System</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Build rituals that stick,{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
              without the burnout.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Habitly gives you the calm clarity, gentle streak momentum, and zero-clutter focus you need to transform daily intentions into natural second nature.
          </p>

          {/* Call-to-action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="hero-cta-start"
              type="button"
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-lg shadow-emerald-600/25 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/40 focus-visible:ring-4 focus-visible:ring-emerald-500/40"
            >
              <span>Start Tracking Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              id="hero-cta-features"
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/40 focus-visible:ring-4 focus-visible:ring-emerald-500/40 shadow-sm"
            >
              See How It Works
            </a>
          </div>

          {/* Keyboard shortcut power-user pill (Desktop Only) */}
          <div className="pt-2 hidden md:flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xs text-slate-500 dark:text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Keyboard Ready
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-[11px] text-slate-700 dark:text-slate-200 shadow-2xs">
                  ← → ↑ ↓
                </kbd>
                <span>Navigate buttons</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-[11px] text-slate-700 dark:text-slate-200 shadow-2xs">
                  ↵ Enter
                </kbd>
                <span>Open tracker</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-[11px] text-slate-700 dark:text-slate-200 shadow-2xs">
                  Shift + ↵
                </kbd>
                <span>Sign in</span>
              </span>
            </div>
          </div>

          {/* Social proof chips */}
          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-500" /> Free forever tier
            </span>
          </div>
        </div>

        {/* Hero Interactive App Mockup Card */}
        <div className="mt-14 max-w-2xl mx-auto">
          <div className="p-1.5 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-850 shadow-2xl">
            <div className="rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-400">habitly.app/today</span>
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                  Interactive Preview
                </span>
              </div>

              {/* Sample Habit Card inside mockup */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Health
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Daily Ritual</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    Morning 20-Min Guided Meditation
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Quiet space, breath awareness before screen time
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1.5 rounded-lg">
                    <Flame className="w-4 h-4 fill-amber-500" />
                    <span>{demoChecked ? '15 Days' : '14 Days'}</span>
                  </div>

                  <button
                    id="hero-demo-btn"
                    type="button"
                    onClick={handleDemoToggle}
                    className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/40 focus-visible:ring-4 focus-visible:ring-emerald-500/40 ${demoChecked
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600'
                      }`}
                  >
                    <CheckCircle className={`w-4 h-4 ${demoChecked ? 'fill-white text-emerald-600' : ''}`} />
                    <span>{demoChecked ? 'Completed!' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-slate-400">
                👆 Click &quot;Mark Done&quot; above to experience the micro-feedback instant reward!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

