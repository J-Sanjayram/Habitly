import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';

export const LandingPage = ({ onOpenTracker }) => {
  return (
    <main className="w-full">
      <Hero onGetStarted={onOpenTracker} />
      <Features />
      <Testimonials />
      <Pricing onSelectPlan={onOpenTracker} />
    </main>
  );
};

