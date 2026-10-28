import React, { useEffect, useRef } from 'react';
import { Search, X, Plus, ArrowUpDown, Filter } from 'lucide-react';

export const FilterControls = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedFrequency,
  onFrequencyChange,
  sortBy,
  onSortChange,
  categories,
  onOpenAddModal,
}) => {
  const searchInputRef = useRef(null);

  // Global shortcut: Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar + Primary Action */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input with keyboard hint & clear button */}
        <div className="relative flex-1">
          <label htmlFor="habit-search" className="sr-only">
            Search habits by title or notes
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={searchInputRef}
            id="habit-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onSearchChange('');
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const target = document.getElementById('tracker-add-habit-btn') ||
                               document.querySelector('[id^="category-tab-"]');
                target?.focus();
              }
            }}
            placeholder="Search habits..."
            className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-xs transition-colors"
          />
          {!searchQuery && (
            <div className="hidden md:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
              <kbd className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 shadow-2xs">
                Ctrl K
              </kbd>
            </div>
          )}
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown & Add Habit Button */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <label htmlFor="sort-habits" className="sr-only">
              Sort habits
            </label>
            <div className="flex items-center justify-between sm:justify-start gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  id="sort-habits"
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-transparent border-none text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="streak-desc">Highest Streak</option>
                  <option value="name-asc">Name (A – Z)</option>
                  <option value="name-desc">Name (Z – A)</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add Habit CTA button */}
          <button
            id="tracker-add-habit-btn"
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-sm shadow-emerald-600/30 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/40 focus-visible:ring-4 focus-visible:ring-emerald-500/40 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar (Category + Status + Frequency) */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pt-1">
        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="Filter by category"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full"
        >
          {categories.map((cat, index) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`category-tab-${cat.toLowerCase()}`}
                role="tab"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => onCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters: Status & Frequency */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status selector */}
          <div className="flex items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5">
            {['all', 'pending', 'completed'].map((st) => (
              <button
                key={st}
                id={`status-filter-${st}`}
                type="button"
                onClick={() => onStatusChange(st)}
                className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  selectedStatus === st
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {st === 'all' ? 'All Status' : st}
              </button>
            ))}
          </div>

          {/* Frequency selector */}
          <div className="flex items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5">
            {['all', 'Daily', 'Weekly'].map((freq) => (
              <button
                key={freq}
                id={`frequency-filter-${freq.toLowerCase()}`}
                type="button"
                onClick={() => onFrequencyChange(freq)}
                className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  selectedFrequency === freq
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-semibold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {freq === 'all' ? 'All Freq' : freq}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

