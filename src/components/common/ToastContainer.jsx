import React, { useEffect, useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X, Undo2 } from 'lucide-react';

const ToastItem = ({ toast, onDismiss }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / toast.duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [toast.duration]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden="true" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" aria-hidden="true" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" aria-hidden="true" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative flex flex-col w-full max-w-sm overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 pointer-events-auto transition-all animate-scale-in"
    >
      <div className="flex items-center gap-3 p-4">
        {icons[toast.type] || icons.info}
        <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
          {toast.message}
        </div>

        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action.onClick();
              onDismiss(toast.id);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={toast.action.label}
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>{toast.action.label}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {toast.duration > 0 && (
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className={`h-full transition-all duration-75 ease-linear ${
              toast.type === 'error'
                ? 'bg-rose-500'
                : toast.type === 'info'
                ? 'bg-indigo-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
};
