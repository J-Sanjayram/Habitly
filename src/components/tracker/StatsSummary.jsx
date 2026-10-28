import React from 'react';
import { Flame, CheckCircle, TrendingUp } from 'lucide-react';

export const StatsSummary = ({ habits }) => {
  const total = habits.length;
  const completedToday = habits.filter((h) => h.completedToday).length;
  const percentage = total > 0 ? Math.round((completedToday / total) * 100) : 0;
  
  const bestStreak = habits.reduce((max, h) => (h.streak > max ? h.streak : max), 0);

  // Compute 7-day consistency across all habits
  let totalOpportunities = 0;
  let totalCompletions = 0;
  habits.forEach((h) => {
    if (Array.isArray(h.weeklyHistory)) {
      totalOpportunities += h.weeklyHistory.length;
      totalCompletions += h.weeklyHistory.filter(Boolean).length;
    }
  });
  const consistencyRate =
    totalOpportunities > 0 ? Math.round((totalCompletions / totalOpportunities) * 100) : 0;

  return (
    <section aria-label="Habit Summary Metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Today's Completion Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Today&apos;s Progress
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {completedToday}/{total}
            </span>
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {percentage}% Done
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Daily habit completion percentage"
            />
          </div>
        </div>
      </div>

      {/* Best Streak Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Highest Active Streak
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {bestStreak}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Consecutive Days
            </span>
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
            🔥 Momentum is compounding!
          </p>
        </div>
      </div>

      {/* Weekly Consistency Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            7-Day Consistency
          </span>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {consistencyRate}%
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Weekly Completion
            </span>
          </div>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium">
            ⚡ Based on past 7 days log
          </p>
        </div>
      </div>
    </section>
  );
};
