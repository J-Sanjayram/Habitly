import React from 'react';

export const SkeletonBox = ({ className = '' }) => (
  <div
    className={`bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse ${className}`}
    aria-hidden="true"
  />
);

export const HabitCardSkeleton = () => (
  <div
    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between h-48 animate-pulse"
    aria-hidden="true"
  >
    <div>
      <div className="flex items-center justify-between mb-3">
        <SkeletonBox className="h-5 w-20 rounded-full" />
        <SkeletonBox className="h-6 w-14 rounded-full" />
      </div>
      <SkeletonBox className="h-6 w-3/4 mb-2" />
      <SkeletonBox className="h-4 w-1/2" />
    </div>

    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        {[...Array(7)].map((_, i) => (
          <SkeletonBox key={i} className="w-5 h-5 rounded-full" />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <SkeletonBox className="w-8 h-8 rounded-lg" />
        <SkeletonBox className="w-24 h-9 rounded-xl" />
      </div>
    </div>
  </div>
);

export const StatsSummarySkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" aria-hidden="true">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-pulse flex items-center gap-4"
      >
        <SkeletonBox className="w-12 h-12 rounded-xl shrink-0" />
        <div className="flex-1">
          <SkeletonBox className="h-4 w-24 mb-2" />
          <SkeletonBox className="h-7 w-16" />
        </div>
      </div>
    ))}
  </div>
);

export const LoadingStateView = () => (
  <div aria-label="Loading habits..." role="status" className="space-y-6">
    <span className="sr-only">Loading habits, please wait...</span>
    <StatsSummarySkeleton />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <HabitCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
