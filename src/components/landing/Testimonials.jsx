import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Elena Rostova",
      role: "Staff Software Engineer",
      avatar: "ER",
      avatarColor: "bg-emerald-600 text-white",
      rating: 5,
      content:
        "Habitly is the first habit tracker that didn't feel like a chore. The instant 1-click completion and the subtle undo safety made tracking seamless. I have maintained my 21-day coding block without missing a beat.",
    },
    {
      name: "Marcus Vance",
      role: "Product Designer & Writer",
      avatar: "MV",
      avatarColor: "bg-indigo-600 text-white",
      rating: 5,
      content:
        "The keyboard shortcuts and instant visual feedback are top-notch. It takes less than 3 seconds in the morning to check off my meditation and reading habits. The dark mode is gorgeous too.",
    },
    {
      name: "Dr. Sarah Chen",
      role: "Clinical Psychologist & Researcher",
      avatar: "SC",
      avatarColor: "bg-teal-600 text-white",
      rating: 5,
      content:
        "From a behavioral science standpoint, positive micro-rewards work infinitely better than harsh streak punishment. Habitly hits the exact sweet spot of gentle momentum and delightful feedback.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Real Stories
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Loved by 40,000+ ritual builders
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            See how everyday professionals and mindful creators build sustainable daily habits with Habitly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-slate-900 p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${t.avatarColor} shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

