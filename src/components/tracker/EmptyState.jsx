import React from 'react';
import { PlusCircle, Sparkles, Compass } from 'lucide-react';

export const EmptyState = ({ onOpenAddModal, onResetSample }) => {
  return (
    <div
      role="region"
      aria-label="Empty habit list"
      className="rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-12 text-center max-w-lg mx-auto animate-fade-in"
    >
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-5 shadow-inner">
        <Compass className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        No habits created yet
      </h3>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        &ldquo;A journey of a thousand miles begins with a single step.&rdquo; Start by defining one small daily ritual you&apos;d like to make second nature.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          id="empty-create-habit-btn"
          type="button"
          onClick={onOpenAddModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/30 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/40 focus-visible:ring-4 focus-visible:ring-emerald-500/40"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Your First Habit</span>
        </button>

        <button
          id="empty-load-sample-btn"
          type="button"
          onClick={onResetSample}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Load Sample Habits</span>
        </button>
      </div>
    </div>
  );
};

