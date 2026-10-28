import React from 'react';
import { RefreshCw, AlertTriangle, Sparkles, Trash2, Sliders } from 'lucide-react';

export const DevStateControls = ({
  onSimulateLoading,
  onToggleError,
  isError,
  onResetData,
  onClearAll,
}) => {
  return (
    <aside
      aria-label="Assignment Reviewer Controls"
      className="mb-8 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 dark:bg-amber-950/20 dark:border-amber-700/40"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <div>
            <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Reviewer State Controls:
            </span>
            <span className="text-xs text-amber-700/80 dark:text-amber-400 ml-1.5 hidden sm:inline">
              Instant triggers to evaluate all 5 required UX states
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Trigger Skeleton Loading */}
          <button
            type="button"
            onClick={onSimulateLoading}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 shadow-xs"
            title="Reloads with 1.2s skeleton loader"
          >
            <RefreshCw className="w-3 h-3 text-slate-500" />
            <span>Simulate Loading</span>
          </button>

          {/* Toggle Error State */}
          <button
            type="button"
            onClick={onToggleError}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 shadow-xs ${
              isError
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
            title="Toggles simulated network error with Retry option"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>{isError ? 'Error Active (Click to Clear)' : 'Simulate Error'}</span>
          </button>

          {/* Clear All to inspect Empty State */}
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500"
            title="Empties habit list to test empty state"
          >
            <Trash2 className="w-3 h-3 text-slate-400" />
            <span>Trigger Empty State</span>
          </button>

          {/* Reset to Sample JSON */}
          <button
            type="button"
            onClick={onResetData}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 shadow-xs"
            title="Reset data back to initial mock JSON"
          >
            <Sparkles className="w-3 h-3" />
            <span>Reset Sample Data</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

