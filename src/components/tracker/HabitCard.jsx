import React from 'react';
import { Badge } from '../common/Badge';
import { Flame, Check, Trash2, Calendar, Target } from 'lucide-react';
import confetti from 'canvas-confetti';

const DAYS_OF_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const HabitCard = ({ habit, onToggleComplete, onDelete, index = 0, totalCount = 1 }) => {
  const handleToggle = () => {
    const willBeCompleted = !habit.completedToday;
    onToggleComplete(habit.id);

    if (willBeCompleted) {
      // Fire confetti for positive reinforcement
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.75 },
        colors: ['#10b981', '#34d399', '#6366f1'],
      });
    }
  };

  const handleCardKeyDown = (e) => {
    const isTargetCard = e.target.tagName === 'ARTICLE';

    // Arrow Down -> Navigate to next habit card
    if (e.key === 'ArrowDown' && isTargetCard) {
      if (index < totalCount - 1) {
        e.preventDefault();
        document.getElementById(`habit-card-${index + 1}`)?.focus();
      }
    }
    // Arrow Up -> Navigate to previous habit card or Add Habit button
    else if (e.key === 'ArrowUp' && isTargetCard) {
      e.preventDefault();
      if (index > 0) {
        document.getElementById(`habit-card-${index - 1}`)?.focus();
      } else {
        document.getElementById('tracker-add-habit-btn')?.focus();
      }
    }
    // Arrow Right on card -> focus into its toggle button
    else if (e.key === 'ArrowRight' && isTargetCard) {
      e.preventDefault();
      document.getElementById(`habit-toggle-${habit.id}`)?.focus();
    }
    // Arrow Left on card -> focus into its delete button
    else if (e.key === 'ArrowLeft' && isTargetCard) {
      e.preventDefault();
      document.getElementById(`habit-delete-${habit.id}`)?.focus();
    }
    // Space or Enter on card -> Toggle complete
    else if ((e.key === ' ' || e.key === 'Enter') && isTargetCard) {
      e.preventDefault();
      handleToggle();
    }
    // Delete key on card -> Delete habit
    else if (e.key === 'Delete' && isTargetCard) {
      e.preventDefault();
      onDelete(habit.id);
    }
  };

  return (
    <article
      id={`habit-card-${index}`}
      tabIndex={0}
      onKeyDown={handleCardKeyDown}
      aria-label={`Habit: ${habit.title}. Press Space or Enter to toggle complete. Use Arrow keys to navigate between habits.`}
      className={`group relative rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
        habit.completedToday
          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-sm'
      }`}
    >
      <div>
        {/* Top bar: Category badge + Frequency + Streak badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge category={habit.category}>{habit.category}</Badge>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {habit.frequency}
            </span>
          </div>

          {/* Streak Badge */}
          <div
            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${
              habit.completedToday
                ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
            title={`Current streak: ${habit.streak} days`}
          >
            <Flame className={`w-3.5 h-3.5 ${habit.streak > 0 ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{habit.streak} {habit.streak === 1 ? 'day' : 'days'}</span>
          </div>
        </div>

        {/* Habit Title */}
        <h3
          className={`text-base font-bold tracking-tight transition-colors ${
            habit.completedToday
              ? 'text-slate-700 dark:text-slate-300 line-through decoration-emerald-500/60 decoration-2'
              : 'text-slate-900 dark:text-white'
          }`}
        >
          {habit.title}
        </h3>

        {/* Target / Cue text */}
        {habit.target && (
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5 leading-relaxed">
            <Target className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
            <span>{habit.target}</span>
          </p>
        )}
      </div>

      {/* Bottom Section: Weekly dots matrix & Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        {/* 7-Day Weekly Progress View (Bonus) */}
        <div className="flex items-center justify-between sm:flex-col sm:items-start gap-1.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Past 7 Days
          </span>
          <div className="flex items-center gap-1.5" aria-label="7-day completion history">
            {DAYS_OF_WEEK.map((dayLabel, idx) => {
              const isPastCompleted = habit.weeklyHistory && habit.weeklyHistory[idx];
              // Last dot represents today
              const isToday = idx === 6;
              const isDone = isToday ? habit.completedToday : isPastCompleted;

              return (
                <div
                  key={idx}
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold transition-colors ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  } ${isToday ? 'ring-1.5 ring-emerald-500/70 ring-offset-1 dark:ring-offset-slate-900 font-extrabold' : ''}`}
                  title={`${dayLabel}: ${isDone ? 'Completed' : 'Missed'}${isToday ? ' (Today)' : ''}`}
                >
                  {isDone ? '✓' : dayLabel}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Delete and Mark Done */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Delete Button */}
          <button
            id={`habit-delete-${habit.id}`}
            type="button"
            onClick={() => onDelete(habit.id)}
            className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500"
            aria-label={`Delete habit: ${habit.title}`}
            title="Delete habit (with 5-second undo)"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Mark Complete Checkbox / Button */}
          <button
            id={`habit-toggle-${habit.id}`}
            type="button"
            onClick={handleToggle}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/40 focus-visible:ring-4 focus-visible:ring-emerald-500/40 ${
              habit.completedToday
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                : 'border-2 border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-700 dark:text-slate-200 hover:text-emerald-600'
            }`}
            aria-pressed={habit.completedToday}
            aria-label={
              habit.completedToday
                ? `Completed ${habit.title} today. Click to mark incomplete.`
                : `Mark ${habit.title} as done for today`
            }
          >
            <div
              className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
                habit.completedToday ? 'bg-white text-emerald-600' : 'border border-slate-400'
              }`}
            >
              {habit.completedToday && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>{habit.completedToday ? 'Done Today' : 'Mark Done'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

