import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

export const Pricing = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for anyone just beginning to build their initial foundational routines.',
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      cta: 'Get Started Free',
      features: [
        'Track up to 5 active habits',
        '7-day streak tracking',
        'Standard categories (Health, Work)',
        'Full keyboard navigation',
        'Local storage sync',
      ],
    },
    {
      name: 'Habit Pro',
      description: 'For professionals and creators seeking maximum consistency and deep analytics.',
      monthlyPrice: 7,
      annualPrice: 5, // $5/mo billed annually ($60/yr)
      popular: true,
      cta: 'Start 14-Day Free Trial',
      badge: 'Most Popular',
      features: [
        'Unlimited active habits',
        'Full historical streak analytics',
        'Unlimited custom tags & categories',
        'Daily smart notifications & cue reminders',
        'CSV data export & offline mode',
        'Priority feature requests',
      ],
    },
    {
      name: 'Lifetime',
      description: 'Pay once, keep forever. Zero subscription fatigue, lifetime updates included.',
      monthlyPrice: 89,
      annualPrice: 89,
      popular: false,
      cta: 'Claim Lifetime Access',
      badge: 'One-Time Payment',
      features: [
        'All Pro features included forever',
        'Lifetime updates & new releases',
        'Direct founder feedback channel',
        'Exclusive ritual blueprints library',
        'Personal habit consultation invite',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Simple, Transparent Pricing
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Invest in your consistency
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Start for free, then upgrade whenever you&apos;re ready to take your habits to the next level.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                Save 28%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price =
              plan.name === 'Lifetime'
                ? plan.annualPrice
                : billingCycle === 'annual'
                ? plan.annualPrice
                : plan.monthlyPrice;

            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 md:-translate-y-2'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                    {plan.badge && !plan.popular && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">
                      {plan.name === 'Lifetime' ? 'one-time' : billingCycle === 'annual' ? '/mo (billed annually)' : '/month'}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Everything included:
                    </p>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={onSelectPlan}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      plan.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

