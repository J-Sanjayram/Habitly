import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export const NoResultsState = ({ searchQuery, selectedCategory, selectedStatus, selectedFrequency, onResetFilters }) => {
  return (
    <div
      role="region"
      aria-label="No habits found"
      className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center max-w-md mx-auto animate-fade-in shadow-xs"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mx-auto flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        No matching habits found
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        We couldn&apos;t find any habits matching{' '}
        {searchQuery ? <span className="font-semibold text-slate-800 dark:text-slate-200">&ldquo;{searchQuery}&rdquo;</span> : 'your current filter criteria'}.
      </p>

      {/* Filter tag indicator */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-400">
        {selectedCategory !== 'All' && (
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
            Category: {selectedCategory}
          </span>
        )}
        {selectedStatus !== 'all' && (
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
            Status: {selectedStatus}
          </span>
        )}
        {selectedFrequency !== 'all' && (
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
            Freq: {selectedFrequency}
          </span>
        )}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters &amp; Search</span>
        </button>
      </div>
    </div>
  );
};
