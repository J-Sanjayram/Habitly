import React, { useEffect } from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';

export const LandingPage = ({ onOpenTracker, onOpenAuth, isAuthenticated }) => {
  // Arrow key navigation between all buttons & interactive elements on Landing Page
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only process arrow keys
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        return;
      }

      const activeEl = document.activeElement;
      const activeTag = activeEl?.tagName;

      // Do not intercept if focus is inside text input, textarea, or select
      if (
        activeTag === 'INPUT' ||
        activeTag === 'TEXTAREA' ||
        activeTag === 'SELECT' ||
        activeEl?.isContentEditable
      ) {
        return;
      }

      // Do not intercept if any modal dialog or tour is currently open
      if (
        document.querySelector('[role="dialog"]') ||
        document.querySelector('[aria-modal="true"]')
      ) {
        return;
      }

      // Helper to check if element is actually visible and rendered on screen
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

      // Collect all visible interactive buttons and links across Header, Landing, Footer
      const focusable = Array.from(
        document.querySelectorAll(
          'button:not([disabled]):not([tabindex="-1"]), a[href]:not([disabled]):not([tabindex="-1"])'
        )
      ).filter(isVisible);

      if (focusable.length === 0) return;

      const isForward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
      const isBackward = e.key === 'ArrowLeft' || e.key === 'ArrowUp';

      const currentIndex = focusable.indexOf(activeEl);

      if (currentIndex !== -1) {
        // Active element is already one of the focusable buttons/links
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
        // No button currently focused (e.g. user clicked background or scrolled)
        e.preventDefault();

        // If at top of page, focus the Hero CTA start button
        const heroStart = document.getElementById('hero-cta-start');
        if (window.scrollY < 250 && heroStart && isVisible(heroStart)) {
          heroStart.focus();
          heroStart.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }

        // Otherwise find the button closest to the viewport vertical center
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

  const handleGetStarted = () => {
    if (isAuthenticated) {
      onOpenTracker();
    } else if (onOpenAuth) {
      onOpenAuth('signup');
    } else {
      onOpenTracker();
    }
  };

  return (
    <main className="w-full">
      <Hero onGetStarted={handleGetStarted} onOpenTour={onOpenTour} />
      <Features />
      <Testimonials />
      <Pricing onSelectPlan={handleGetStarted} />
    </main>
  );
};
