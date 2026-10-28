import React from 'react';
import { Flame, Zap, BarChart3, Layers, CheckCircle2, RotateCcw } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <Flame className="w-6 h-6 text-amber-500" />,
      tag: "Positive Psychology",
      title: "Gentle Streak Engine",
      description:
        "Build unbreakable consistency with visual momentum. We celebrate every milestone with micro-delight, without demoralizing streaks when life happens.",
      points: ["Real-time streak multipliers", "7-Day weekly visual dots", "Celebratory milestone animations"],
      badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-500" />,
      tag: "Zero Friction",
      title: "Instant 1-Click Checkoff & Safe Undo",
      description:
        "Logging a habit shouldn't feel like a chore. Check items off instantly with optimistic feedback, and safely reverse accidental clicks with built-in 5-second undo.",
      points: ["Instant optimistic UI state", "5-second non-blocking undo", "Full keyboard shortcut flow"],
      badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-indigo-500" />,
      tag: "Organized Living",
      title: "Smart Categories & Search Matrix",
      description:
        "Group your daily rituals into meaningful life areas: Health, Deep Work, Mindfulness, and Fitness. Filter and search across any dimension in milliseconds.",
      points: ["Instant multi-parameter filter", "Inline form validation", "Progress completion percentages"],
      badgeColor: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Why Habitly
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Designed to make good habits effortless
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Most habit apps overwhelm you with complex setup and endless charts. Habitly focuses on the 3 things that actually drive behavioral change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-white dark:bg-slate-900 p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {feature.icon}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${feature.badgeColor}`}>
                  {feature.tag}
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <ul className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                {feature.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

