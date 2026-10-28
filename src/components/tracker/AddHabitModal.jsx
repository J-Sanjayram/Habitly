import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, PlusCircle } from 'lucide-react';

const CATEGORIES = ['Health', 'Fitness', 'Productivity', 'Mindfulness', 'Learning'];

export const AddHabitModal = ({ isOpen, onClose, onAddHabit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Health');
  const [frequency, setFrequency] = useState('Daily');
  const [target, setTarget] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const titleInputRef = useRef(null);
  const modalRef = useRef(null);

  // Focus title input on open, trap focus inside modal, and handle Escape key
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setCategory('Health');
      setFrequency('Daily');
      setTarget('');
      setErrors({});
      setTouched({});

      const previousActiveElement = document.activeElement;

      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        // Trap focus inside modal
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
          previousActiveElement.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  // Validation function
  const validate = (currentTitle, currentCategory) => {
    const newErrors = {};
    const trimmedTitle = currentTitle.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Habit title is required';
    } else if (trimmedTitle.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    } else if (trimmedTitle.length > 60) {
      newErrors.title = 'Title cannot exceed 60 characters';
    }

    if (!currentCategory) {
      newErrors.category = 'Please select a valid category';
    }

    return newErrors;
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (touched.title) {
      const valErrors = validate(val, category);
      setErrors((prev) => ({ ...prev, title: valErrors.title }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const valErrors = validate(title, category);
    setErrors((prev) => ({ ...prev, [field]: valErrors[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, category: true });
    const validationErrors = validate(title, category);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onAddHabit({
      title: title.trim(),
      category,
      frequency,
      target: target.trim() || 'Daily ritual cue',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Create New Habit
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Define your ritual and establish your trigger cue
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Close modal dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form with inline validation */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          {/* Title Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="habit-title" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Habit Title <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {title.length}/60
              </span>
            </div>
            <input
              ref={titleInputRef}
              id="habit-title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={() => handleBlur('title')}
              placeholder="e.g., Read 20 pages, 10 min stretch..."
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-sm text-slate-900 dark:text-white placeholder-slate-400 transition-colors focus-visible:ring-2 ${
                errors.title
                  ? 'border-rose-400 dark:border-rose-600 focus-visible:ring-rose-500'
                  : 'border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500'
              }`}
            />
            {errors.title && (
              <p id="title-error" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Category Selector */}
          <div>
            <label htmlFor="habit-category" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              id="habit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Frequency (Radio Group) */}
          <div>
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Frequency
            </span>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Target Frequency">
              {['Daily', 'Weekly'].map((freq) => (
                <label
                  key={freq}
                  className={`flex items-center justify-center py-2.5 px-4 rounded-xl border text-xs font-semibold cursor-pointer transition-all focus-within:ring-2 focus-within:ring-emerald-500 ${
                    frequency === freq
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={freq}
                    checked={frequency === freq}
                    onChange={() => setFrequency(freq)}
                    className="sr-only"
                  />
                  <span>{freq}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cue / Goal note */}
          <div>
            <label htmlFor="habit-target" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Trigger Cue or Intention <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              id="habit-target"
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., Right after brewing morning coffee"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-sm shadow-emerald-600/30 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Save Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

