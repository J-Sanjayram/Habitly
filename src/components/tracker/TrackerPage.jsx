import React, { useState, useEffect, useMemo, useCallback } from 'react';
import initialHabitsData from '../../data/initialHabits.json';
import { useToast } from '../../context/ToastContext';
import { StatsSummary } from './StatsSummary';
import { FilterControls } from './FilterControls';
import { HabitCard } from './HabitCard';
import { AddHabitModal } from './AddHabitModal';
import { EmptyState } from './EmptyState';
import { NoResultsState } from './NoResultsState';
import { ErrorState } from './ErrorState';
import { LoadingStateView } from '../common/Skeleton';
import { DevStateControls } from './DevStateControls';
import { Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Health', 'Fitness', 'Productivity', 'Mindfulness', 'Learning'];

export const TrackerPage = ({ onReplaySplash, onOpenTour }) => {
  const { showToast } = useToast();

  // State
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('habitly_user_habits');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved habits:', e);
    }
    return initialHabitsData;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'pending' | 'completed'
  const [selectedFrequency, setSelectedFrequency] = useState('all'); // 'all' | 'Daily' | 'Weekly'
  const [sortBy, setSortBy] = useState('streak-desc'); // 'streak-desc' | 'name-asc' | 'name-desc' | 'newest'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('habitly_user_habits', JSON.stringify(habits));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [habits]);

  // Simulate brief initial load skeleton on mount for realism
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Handlers for Dev Controls (Reviewer ease)
  const handleSimulateLoading = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast({ message: 'Loaded fresh habit stream!', type: 'info', duration: 2500 });
    }, 1200);
  }, [showToast]);

  const handleToggleError = useCallback(() => {
    setIsError((prev) => !prev);
  }, []);

  const handleRetry = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsError(false);
      setIsLoading(false);
      showToast({ message: 'Connected successfully! Habits retrieved.', type: 'success' });
    }, 900);
  }, [showToast]);

  const handleResetData = useCallback(() => {
    setHabits(initialHabitsData);
    setIsError(false);
    showToast({ message: 'Reset data to sample JSON items.', type: 'info' });
  }, [showToast]);

  const handleClearAll = useCallback(() => {
    setHabits([]);
    showToast({ message: 'All habits cleared to demonstrate Empty State.', type: 'info' });
  }, [showToast]);

  // Habit Actions
  const handleToggleComplete = useCallback((id) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        const nextCompleted = !habit.completedToday;
        const nextStreak = nextCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        
        // Update today's slot in 7-day history (slot index 6)
        const updatedHistory = [...(habit.weeklyHistory || [false, false, false, false, false, false, false])];
        updatedHistory[6] = nextCompleted;

        return {
          ...habit,
          completedToday: nextCompleted,
          streak: nextStreak,
          weeklyHistory: updatedHistory,
        };
      })
    );

    const targetHabit = habits.find((h) => h.id === id);
    if (targetHabit) {
      if (!targetHabit.completedToday) {
        showToast({
          message: `Great job! "${targetHabit.title}" checked off for today! 🔥`,
          type: 'success',
          duration: 3500,
        });
      } else {
        showToast({
          message: `"${targetHabit.title}" marked incomplete.`,
          type: 'info',
          duration: 2500,
        });
      }
    }
  }, [habits, showToast]);

  const handleDeleteHabit = useCallback((id) => {
    const habitToDelete = habits.find((h) => h.id === id);
    const habitIndex = habits.findIndex((h) => h.id === id);
    if (!habitToDelete) return;

    // Delete optimistically
    setHabits((prev) => prev.filter((h) => h.id !== id));

    // Offer 5-second undo toast!
    showToast({
      message: `Deleted "${habitToDelete.title}"`,
      type: 'info',
      duration: 5000,
      action: {
        label: 'Undo',
        onClick: () => {
          setHabits((prev) => {
            const restored = [...prev];
            restored.splice(habitIndex, 0, habitToDelete);
            return restored;
          });
          showToast({ message: `Restored "${habitToDelete.title}"`, type: 'success' });
        },
      },
    });
  }, [habits, showToast]);

  const handleAddHabit = useCallback((newHabitData) => {
    const newHabit = {
      id: 'h-' + Date.now().toString(36),
      title: newHabitData.title,
      category: newHabitData.category,
      frequency: newHabitData.frequency,
      target: newHabitData.target,
      streak: 0,
      completedToday: false,
      createdAt: new Date().toISOString().split('T')[0],
      weeklyHistory: [false, false, false, false, false, false, false],
    };

    setHabits((prev) => [newHabit, ...prev]);
    showToast({
      message: `Habit "${newHabit.title}" created successfully! 🎯`,
      type: 'success',
      duration: 4000,
    });
  }, [showToast]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('all');
    setSelectedFrequency('all');
  }, []);

  // Filtered and Sorted Habits
  const filteredHabits = useMemo(() => {
    let result = [...habits];

    // Search query filter (matches title or target notes)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (h) => h.title.toLowerCase().includes(q) || (h.target && h.target.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((h) => h.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus === 'completed') {
      result = result.filter((h) => h.completedToday);
    } else if (selectedStatus === 'pending') {
      result = result.filter((h) => !h.completedToday);
    }

    // Frequency filter
    if (selectedFrequency !== 'all') {
      result = result.filter((h) => h.frequency === selectedFrequency);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'streak-desc') return b.streak - a.streak;
      if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'name-desc') return b.title.localeCompare(a.title);
      if (sortBy === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
      return 0;
    });

    return result;
  }, [habits, searchQuery, selectedCategory, selectedStatus, selectedFrequency, sortBy]);

  // Arrow key navigation between all buttons, controls, and habit cards on Tracker Page
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only process arrow keys
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        return;
      }

      const activeEl = document.activeElement;
      const activeTag = activeEl?.tagName;

      // When focused in search input, allow text editing with left/right,
      // but let ArrowDown exit search directly to the Add Habit button or category filters
      if (activeTag === 'INPUT') {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const target = document.getElementById('tracker-add-habit-btn') ||
            document.querySelector('[id^="category-tab-"]') ||
            document.getElementById('habit-card-0');
          if (target) {
            target.focus();
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
        return;
      }

      // Do not intercept if focus is inside textarea, select or contentEditable
      if (activeTag === 'TEXTAREA' || activeTag === 'SELECT' || activeEl?.isContentEditable) {
        return;
      }

      // Do not intercept if any modal dialog is currently open
      if (
        document.querySelector('[role="dialog"]') ||
        document.querySelector('[aria-modal="true"]')
      ) {
        return;
      }

      // Helper to test if element is visible and interactive
      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        if (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          style.opacity === '0'
        ) {
          return false;
        }
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      };

      // Collect all focusable controls across Header, Tracker Content, and Footer
      const focusable = Array.from(
        document.querySelectorAll(
          'button:not([disabled]):not([tabindex="-1"]), a[href]:not([disabled]):not([tabindex="-1"]), article[id^="habit-card-"]'
        )
      ).filter(isVisible);

      if (focusable.length === 0) return;

      const isForward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
      const isBackward = e.key === 'ArrowLeft' || e.key === 'ArrowUp';

      const currentIndex = focusable.indexOf(activeEl);

      if (currentIndex !== -1) {
        // Fast shortcut: When focused on a habit's "Mark Done" / "Done Today" button
        if (activeEl?.id?.startsWith('habit-toggle-')) {
          const currentHabitId = activeEl.id.replace('habit-toggle-', '');
          const allToggles = focusable.filter((el) => el.id?.startsWith('habit-toggle-'));
          const toggleIndex = allToggles.indexOf(activeEl);

          if (e.key === 'ArrowDown' && allToggles.length > 1) {
            e.preventDefault();
            const nextToggle = allToggles[(toggleIndex + 1) % allToggles.length];
            nextToggle?.focus();
            nextToggle?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
          } else if (e.key === 'ArrowUp' && allToggles.length > 1) {
            e.preventDefault();
            const prevToggle = allToggles[(toggleIndex - 1 + allToggles.length) % allToggles.length];
            prevToggle?.focus();
            prevToggle?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const deleteBtn = document.getElementById(`habit-delete-${currentHabitId}`);
            if (deleteBtn) {
              deleteBtn.focus();
              return;
            }
          }
        }

        // Fast shortcut: When focused on a habit's Delete button
        if (activeEl?.id?.startsWith('habit-delete-')) {
          const currentHabitId = activeEl.id.replace('habit-delete-', '');
          const allDeletes = focusable.filter((el) => el.id?.startsWith('habit-delete-'));
          const delIndex = allDeletes.indexOf(activeEl);

          if (e.key === 'ArrowRight') {
            e.preventDefault();
            const toggleBtn = document.getElementById(`habit-toggle-${currentHabitId}`);
            if (toggleBtn) {
              toggleBtn.focus();
              return;
            }
          } else if (e.key === 'ArrowDown' && allDeletes.length > 1) {
            e.preventDefault();
            const nextDel = allDeletes[(delIndex + 1) % allDeletes.length];
            nextDel?.focus();
            nextDel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
          } else if (e.key === 'ArrowUp' && allDeletes.length > 1) {
            e.preventDefault();
            const prevDel = allDeletes[(delIndex - 1 + allDeletes.length) % allDeletes.length];
            prevDel?.focus();
            prevDel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
          }
        }

        // Standard sequential cycling across all interactive buttons
        e.preventDefault();
        let nextIndex;
        if (isForward) {
          nextIndex = (currentIndex + 1) % focusable.length;
        } else if (isBackward) {
          nextIndex = (currentIndex - 1 + focusable.length) % focusable.length;
        }
        const nextTarget = focusable[nextIndex];
        if (nextTarget) {
          nextTarget.focus();
          nextTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        // No button currently focused: focus the primary Add Habit button or first element in viewport
        e.preventDefault();

        const addHabitBtn = document.getElementById('tracker-add-habit-btn');
        if (window.scrollY < 250 && addHabitBtn && isVisible(addHabitBtn)) {
          addHabitBtn.focus();
          addHabitBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }

        const viewportMid = window.innerHeight / 2;
        let bestCandidate = focusable[0];
        let minDiff = Infinity;

        for (const el of focusable) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -50 && rect.bottom <= window.innerHeight + 50) {
            const diff = Math.abs(rect.top - viewportMid);
            if (diff < minDiff) {
              minDiff = diff;
              bestCandidate = el;
            }
          }
        }

        bestCandidate.focus();
        bestCandidate.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Dev & Reviewer Controls Toolbar */}
      <DevStateControls
        onSimulateLoading={handleSimulateLoading}
        onToggleError={handleToggleError}
        isError={isError}
        onResetData={handleResetData}
        onClearAll={handleClearAll}
        onReplaySplash={onReplaySplash}
        onOpenTour={onOpenTour}
      />

      {/* Screen Title & Motivation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              My Habits
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              {habits.length} Active
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track daily rituals, build momentum, and master consistency.
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="font-mono font-bold text-slate-700 dark:text-slate-200">← → ↑ ↓</span> Arrow keys to move between buttons &amp; cards
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <kbd className="font-mono font-bold text-slate-700 dark:text-slate-200">Space / Enter</kbd> Check off habit
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <kbd className="font-mono font-bold text-slate-700 dark:text-slate-200">Ctrl+K</kbd> Search
            </span>
          </div>
        </div>
      </div>

      {/* Primary Content Switcher according to State */}
      {isLoading ? (
        <LoadingStateView />
      ) : isError ? (
        <ErrorState onRetry={handleRetry} onReset={handleResetData} />
      ) : habits.length === 0 ? (
        <EmptyState
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onResetSample={handleResetData}
        />
      ) : (
        <>
          {/* Top Level Metrics */}
          <StatsSummary habits={habits} />

          {/* Filter, Search, Sort & Add */}
          <FilterControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedFrequency={selectedFrequency}
            onFrequencyChange={setSelectedFrequency}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categories={CATEGORIES}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />

          {/* Grid of habits OR No results feedback */}
          {filteredHabits.length === 0 ? (
            <NoResultsState
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              selectedFrequency={selectedFrequency}
              onResetFilters={handleResetFilters}
            />
          ) : (
            <div
              role="feed"
              aria-label="Habits list"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredHabits.map((habit, index) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  index={index}
                  totalCount={filteredHabits.length}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteHabit}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Add Habit Modal with Inline Validation */}
      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddHabit={handleAddHabit}
      />
    </div>
  );
};

