import React from 'react';
import { AlertTriangle, RefreshCw, HelpCircle } from 'lucide-react';

export const ErrorState = ({ onRetry, onReset }) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 p-10 text-center max-w-md mx-auto animate-fade-in shadow-xs"
    >
      <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        Unable to load your habits
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        We encountered a simulated network error while synchronizing with the habit database. (Status 503: Service Unavailable)
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-rose-500"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Restore Defaults
        </button>
      </div>
    </div>
  );
};
